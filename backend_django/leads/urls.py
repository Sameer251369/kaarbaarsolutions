from django.urls import path

from .views import CallbackLeadView, ContactLeadView

urlpatterns = [
    path("contact", ContactLeadView.as_view()),
    path("callback", CallbackLeadView.as_view()),
]
