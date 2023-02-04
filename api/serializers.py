from rest_framework.serializers import ModelSerializer
from .models import Note, Question


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'


class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
