from django.urls import path
from .views import (
    home,
    contact_api,
    portfolio_data_api,
    profiles_api,
    achievements_api,
    stats_api,
)

urlpatterns = [
    path("", home),
    path("api/contact/", contact_api),
    path("api/portfolio-data/", portfolio_data_api),
    path("api/profiles/", profiles_api),
    path("api/achievements/", achievements_api),
    path("api/stats/", stats_api),
]