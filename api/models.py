from django.db import models

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
