from rest_framework.serializers import ModelSerializer, CharField
from .models import Note, Question, User, TriviaExam, TriviaQuestion, TriviaQuestionResult


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']
        extract_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'


class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class TriviaQuestionResultSerializer(ModelSerializer):

    question = CharField(source='question.question')

    class Meta:
        model = TriviaQuestionResult
        fields = '__all__'


class TriviaExamSerializer(ModelSerializer):

    questions = TriviaQuestionResultSerializer(many=True, read_only=True)

    class Meta:
        model = TriviaExam
        fields = '__all__'
