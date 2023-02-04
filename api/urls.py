from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('notes/', views.getNotes, name="notes"),
    path('note/<str:id>/', views.getNote, name="note"),
    path('questions/', views.getQuestions, name="questions"),
    path('question/<str:id>/', views.getQuestion, name="question"),

]
