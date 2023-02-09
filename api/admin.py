from django.contrib import admin

# Register your models here.

from .models import User, TriviaQuestion, TriviaQuestionResult, TriviaExam

admin.site.register(User)
admin.site.register(TriviaQuestion)
admin.site.register(TriviaQuestionResult)
admin.site.register(TriviaExam)
