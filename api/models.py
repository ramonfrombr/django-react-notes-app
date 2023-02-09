from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class TriviaQuestion(models.Model):
    category = models.TextField(null=True, blank=True)
    type = models.TextField(null=True, blank=True)
    difficulty = models.TextField(null=True, blank=True)
    question = models.TextField(null=True, blank=True)
    correct_answer = models.TextField(null=True, blank=True)
    incorrect_answers = ArrayField(
        models.TextField(null=True, blank=True), size=3)


class TriviaExam(models.Model):
    category = models.TextField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)


class TriviaQuestionResult(models.Model):
    exam = models.ForeignKey(
        TriviaExam, related_name="questions", on_delete=models.CASCADE)
    question = models.ForeignKey(TriviaQuestion, on_delete=models.CASCADE)
    result_correct = models.BooleanField()
