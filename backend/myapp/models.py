from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class CodingProfile(models.Model):
    platform = models.CharField(max_length=100, help_text="e.g. GitHub, GeeksforGeeks, LeetCode, LinkedIn")
    username = models.CharField(max_length=100, help_text="e.g. @saurabhmaurpx2")
    profile_url = models.URLField(max_length=500)
    description = models.CharField(max_length=255, blank=True, null=True, help_text="e.g. Algorithmic problem solving, Growing Network of")
    problems_solved = models.IntegerField(blank=True, null=True, help_text="Numeric count of problems solved (e.g. 400)")
    star_rating = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. 4-Star")
    coding_streak_days = models.IntegerField(blank=True, null=True, help_text="Numeric count of streak days (e.g. 185)")
    followers_count = models.IntegerField(blank=True, null=True, help_text="Numeric count of followers (e.g. 6700)")
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order', 'id']

    def __str__(self):
        return f"{self.platform} ({self.username})"


class Achievement(models.Model):
    year_label = models.CharField(max_length=50, help_text="e.g. 2026, 2025, 2024, Ongoing, 2023–24")
    title = models.CharField(max_length=255, help_text="Achievement title")
    subtitle = models.CharField(max_length=255, blank=True, null=True, help_text="Achievement subtitle or detail")
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=100, default="general", blank=True)
    key_identifier = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Optional identifier for dynamic sync (e.g. 'dsa_solved', 'coding_streak')"
    )
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order', 'id']

    def __str__(self):
        return f"{self.year_label} - {self.title}"


class ProfileStat(models.Model):
    gate_air = models.CharField(max_length=50, default="7409", help_text="e.g. 7409")
    gate_score = models.CharField(max_length=50, default="503", help_text="e.g. 503")
    gate_qualifications_count = models.IntegerField(default=2)
    projects_built_count = models.IntegerField(default=10)
    internships_completed_count = models.IntegerField(default=1)
    off_campus_offers_count = models.IntegerField(default=1)
    cgpa = models.CharField(max_length=20, default="8.46")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profile Stats"
        verbose_name_plural = "Profile Stats"

    def __str__(self):
        return f"Portfolio Stats (Updated: {self.updated_at.strftime('%Y-%m-%d %H:%M')})"