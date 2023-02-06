from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.


class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]


class Question(models.Model):
    question = models.TextField(null=True, blank=True)
    correct_option = models.TextField(null=True, blank=True)
    incorrect_option1 = models.TextField(null=True, blank=True)
    incorrect_option2 = models.TextField(null=True, blank=True)
    incorrect_option3 = models.TextField(null=True, blank=True)
    incorrect_option4 = models.TextField(null=True, blank=True)
    topic = models.TextField(null=True, blank=True)


class TriviaQuestion(models.Model):
    category = models.TextField(null=True, blank=True)
    type = models.TextField(null=True, blank=True)
    difficulty = models.TextField(null=True, blank=True)
    question = models.TextField(null=True, blank=True)
    correct_answer = models.TextField(null=True, blank=True)
    incorrect_answers = ArrayField(
        models.TextField(null=True, blank=True), size=3)


class User(models.Model):
    pass
