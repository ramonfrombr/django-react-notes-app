from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('notes/', views.getNotes, name="notes"),
    path('note/<str:id>/', views.getNote, name="note"),
    path('questions/', views.getQuestions, name="questions"),
    path('question/<str:id>/', views.getQuestion, name="question"),
    path('trivia_question/', views.saveTriviaQuestion, name="saveTriviaQuestion"),

    path('trivia_exams_results', views.getTriviaExamsResults,
         name="getTriviaExamsResults"),
    path('save_trivia_exam_result', views.saveTriviaExamResult,
         name="saveTriviaExamResult"),
    # Auth
    path('register', views.RegisterView.as_view(), name="register"),
    path('login', views.LoginView.as_view(), name="login"),
    path('user', views.UserView.as_view(), name="user"),
    path('logout', views.LogoutView.as_view(), name="logout")
]
