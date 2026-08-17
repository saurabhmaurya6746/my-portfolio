from django.contrib import admin
from .models import Contact, CodingProfile, Achievement, ProfileStat

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "created_at")
    search_fields = ("name", "email", "message")
    ordering = ("-created_at",)

@admin.register(CodingProfile)
class CodingProfileAdmin(admin.ModelAdmin):
    list_display = ("platform", "username", "problems_solved", "star_rating", "coding_streak_days", "followers_count", "display_order", "is_active")
    list_editable = ("problems_solved", "star_rating", "coding_streak_days", "followers_count", "display_order", "is_active")
    search_fields = ("platform", "username", "description")
    list_filter = ("is_active", "platform")
    ordering = ("display_order", "id")

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ("year_label", "title", "subtitle", "key_identifier", "display_order", "is_active")
    list_editable = ("display_order", "is_active")
    search_fields = ("title", "subtitle", "year_label", "description")
    list_filter = ("is_active", "year_label")
    ordering = ("display_order", "id")

@admin.register(ProfileStat)
class ProfileStatAdmin(admin.ModelAdmin):
    list_display = ("gate_air", "gate_score", "projects_built_count", "gate_qualifications_count", "internships_completed_count", "off_campus_offers_count", "cgpa", "updated_at")