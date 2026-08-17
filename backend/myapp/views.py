import json
import logging
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.core.mail import EmailMessage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Contact, CodingProfile, Achievement, ProfileStat

logger = logging.getLogger(__name__)


def home(request):
    return JsonResponse({
        "message": "Back"
    })


def serialize_profile(p):
    return {
        "id": p.id,
        "platform": p.platform,
        "username": p.username,
        "profile_url": p.profile_url,
        "description": p.description,
        "problems_solved": p.problems_solved,
        "star_rating": p.star_rating,
        "coding_streak_days": p.coding_streak_days,
        "followers_count": p.followers_count,
        "display_order": p.display_order,
        "is_active": p.is_active,
    }


def serialize_achievement(a):
    return {
        "id": a.id,
        "year_label": a.year_label,
        "title": a.title,
        "subtitle": a.subtitle,
        "description": a.description,
        "category": a.category,
        "key_identifier": a.key_identifier,
        "display_order": a.display_order,
        "is_active": a.is_active,
    }


def serialize_stats(s):
    if not s:
        return {
            "gate_air": "7409",
            "gate_score": "503",
            "gate_qualifications_count": 2,
            "projects_built_count": 10,
            "internships_completed_count": 1,
            "off_campus_offers_count": 1,
            "cgpa": "8.46",
        }
    return {
        "gate_air": s.gate_air,
        "gate_score": s.gate_score,
        "gate_qualifications_count": s.gate_qualifications_count,
        "projects_built_count": s.projects_built_count,
        "internships_completed_count": s.internships_completed_count,
        "off_campus_offers_count": s.off_campus_offers_count,
        "cgpa": s.cgpa,
    }


def portfolio_data_api(request):
    profiles = [serialize_profile(p) for p in CodingProfile.objects.filter(is_active=True).order_by('display_order', 'id')]
    achievements = [serialize_achievement(a) for a in Achievement.objects.filter(is_active=True).order_by('display_order', 'id')]
    stats_obj = ProfileStat.objects.first()
    stats = serialize_stats(stats_obj)

    return JsonResponse({
        "success": True,
        "profiles": profiles,
        "achievements": achievements,
        "stats": stats,
    })


def profiles_api(request):
    profiles = [serialize_profile(p) for p in CodingProfile.objects.filter(is_active=True).order_by('display_order', 'id')]
    return JsonResponse({"success": True, "profiles": profiles})


def achievements_api(request):
    achievements = [serialize_achievement(a) for a in Achievement.objects.filter(is_active=True).order_by('display_order', 'id')]
    return JsonResponse({"success": True, "achievements": achievements})


def stats_api(request):
    stats_obj = ProfileStat.objects.first()
    return JsonResponse({"success": True, "stats": serialize_stats(stats_obj)})


@csrf_exempt
def contact_api(request):
    if request.method != "POST":
        return JsonResponse({"success": False, "error": "Method not allowed"}, status=405)

    try:
        data = json.loads(request.body)
    except Exception:
        return JsonResponse({"success": False, "error": "Invalid JSON format"}, status=400)

    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    message = str(data.get("message", "")).strip()

    if not name:
        return JsonResponse({"success": False, "error": "Name is required."}, status=400)

    if not email:
        return JsonResponse({"success": False, "error": "Email is required."}, status=400)

    try:
        validate_email(email)
    except ValidationError:
        return JsonResponse({"success": False, "error": "Invalid email address."}, status=400)

    if not message:
        return JsonResponse({"success": False, "error": "Message is required."}, status=400)

    # Save to SQLite database
    contact = Contact.objects.create(name=name, email=email, message=message)

    # Compose clean email
    subject = "New Portfolio Contact Message"
    body = f"""New message from your portfolio website

Name: {name}
Email: {email}

Message:
{message}
"""
    recipient = getattr(settings, "CONTACT_RECIPIENT_EMAIL", "saurabhmauryajnp28@gmail.com")
    from_email = getattr(settings, "DEFAULT_FROM_EMAIL", recipient)

    # Attempt to send email via SMTP
    try:
        email_msg = EmailMessage(
            subject=subject,
            body=body,
            from_email=from_email,
            to=[recipient],
            reply_to=[email],
        )
        email_msg.send(fail_silently=False)
        return JsonResponse({
            "success": True,
            "message": "Message sent successfully."
        })
    except Exception as e:
        logger.error(f"Error sending contact email: {e}")
        return JsonResponse({
            "success": False,
            "error": "Failed to send email. Please ensure SMTP credentials are configured.",
            "details": str(e) if settings.DEBUG else None
        }, status=500)
