from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note, Question, TriviaQuestion
from .serializers import NoteSerializer, QuestionSerializer


@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]

    return Response(routes)


@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getNote(request, id):
    note = Note.objects.get(id=id)
    serializer = NoteSerializer(note)
    return Response(serializer.data)


@api_view(['GET'])
def getQuestions(request):
    questions = Question.objects.all()
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getQuestion(request, id):
    question = Question.objects.get(id=id)
    serializer = QuestionSerializer(question)
    return Response(serializer.data)


@api_view(['POST'])
def saveTriviaQuestion(request):

    for question in request.data:

        print(question)

        q = TriviaQuestion.objects.filter(
            question=question['question']).first()

        if q:
            print(">>>> Question exists")
            print(q)
        else:
            print(">>>> Question DOES NOT exists")
            new_question = TriviaQuestion(**question)
            new_question.save()
        print("\n\n")

    return Response({'message': 'success'})
