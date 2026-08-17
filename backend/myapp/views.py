import json
import logging
import traceback
import resend
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
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


def send_resend_notification(name, email, message, contact_id, created_at):
    """
    Sends email notification using the Resend Python API.
    Does NOT use Gmail SMTP.
    """
    api_key = getattr(settings, "RESEND_API_KEY", "").strip()
    if not api_key:
        logger.warning("RESEND_API_KEY is not configured. Email notification skipped.")
        return False

    resend.api_key = api_key
    recipient = getattr(settings, "CONTACT_RECIPIENT_EMAIL", "saurabhmauryajnp28@gmail.com").strip()
    from_email = getattr(settings, "RESEND_FROM_EMAIL", "Portfolio <onboarding@resend.dev>").strip()

    created_at_str = created_at.strftime("%Y-%m-%d %H:%M:%S UTC") if created_at else "N/A"
    subject = f"New Portfolio Contact — {name}"

    text_content = f"""New contact message from portfolio website:

Name: {name}
Email: {email}
Submission ID: #{contact_id}
Submission Time: {created_at_str}

Message:
{message}
"""

    html_content = f"""
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
        <h2 style="color: #4f46e5; margin-top: 0; font-size: 20px;">New Portfolio Contact Message</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr>
                <td style="padding: 8px 0; color: #64748b; width: 130px;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">{name}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #1e293b;"><a href="mailto:{email}" style="color: #4f46e5; text-decoration: none;">{email}</a></td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Submission ID:</strong></td>
                <td style="padding: 8px 0; color: #1e293b;">#{contact_id}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Submission Time:</strong></td>
                <td style="padding: 8px 0; color: #1e293b;">{created_at_str}</td>
            </tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #4f46e5; border-radius: 4px;">
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">{message}</p>
        </div>
    </div>
    """

    params = {
        "from": from_email,
        "to": [recipient],
        "reply_to": email,
        "subject": subject,
        "text": text_content,
        "html": html_content,
    }

    try:
        response = resend.Emails.send(params)
        logger.info(f"Resend notification successfully sent for submission ID {contact_id}: {response}")
        return True
    except Exception as e:
        logger.error(f"Resend notification failed for submission ID {contact_id}: {e}")
        return False


@csrf_exempt
def contact_api(request):
    if request.method != "POST":
        return JsonResponse({"success": False, "error": "Method not allowed"}, status=405)

    try:
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

        # 1. ALWAYS Save to Django Database First
        contact = None
        contact_id = None
        try:
            contact = Contact.objects.create(name=name, email=email, message=message)
            contact_id = contact.id
            logger.info(f"Contact submission saved to database with ID {contact_id}")
        except Exception as db_err:
            logger.error(f"Database save error: {db_err}\n{traceback.format_exc()}")
            return JsonResponse({
                "success": False,
                "error": "Unable to save your message. Please try again later."
            }, status=500)

        # 2. Send email notification using Resend API (HTTP REST)
        email_sent = False
        try:
            email_sent = send_resend_notification(
                name=name,
                email=email,
                message=message,
                contact_id=contact_id,
                created_at=contact.created_at,
            )
        except Exception as mail_err:
            logger.error(f"Error during Resend notification: {mail_err}")

        # 3. Always return HTTP 200 with appropriate status message
        if email_sent:
            return JsonResponse({
                "success": True,
                "message": "Message sent successfully.",
                "email_sent": True,
                "id": contact_id,
            }, status=200)
        else:
            return JsonResponse({
                "success": True,
                "message": "Message received and saved successfully.",
                "email_sent": False,
                "id": contact_id,
            }, status=200)

    except Exception as top_err:
        logger.error(f"Unhandled error in contact_api: {top_err}\n{traceback.format_exc()}")
        return JsonResponse({
            "success": False,
            "error": "Unable to send your message. Please try again or contact me directly by email."
        }, status=500)




