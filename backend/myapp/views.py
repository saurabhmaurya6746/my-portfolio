import json
from django.views.decorators.csrf import csrf_exempt
from .models import Contact
from django.http import JsonResponse
from django.core.mail import send_mail


def home(request):
    return JsonResponse({
        "message":"Back"
    })
 

@csrf_exempt
def contact_api(request):
    if request.method == "POST":
        data = json.loads(request.body)

        contact = Contact.objects.create(
            name=data["name"],
            email=data["email"],
            message=data["message"]
        )

        send_mail(
            subject=f"New Portfolio Contact from {contact.name}",
            message=f"""
Name: {contact.name}

Email: {contact.email}

Message:
{contact.message}
""",
            from_email=None,
            recipient_list=["saurabhmauryajnp28@gmail.com"],
            fail_silently=False,
        )

        return JsonResponse({
            "success": True,
            "message": "Message saved and email sent successfully"
        })

    return JsonResponse({"error": "Invalid request"})