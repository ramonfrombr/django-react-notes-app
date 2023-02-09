from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.decorators import api_view
from .models import TriviaQuestion, User, TriviaExam, TriviaQuestionResult
from .serializers import UserSerializer, TriviaExamSerializer, TriviaQuestionSerializer
from rest_framework.views import APIView
import jwt
import datetime
from django.views.decorators.csrf import csrf_exempt


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


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("User not found.")

        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password.")

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {'jwt': token}
        return response


class UserView(APIView):
    def get(self, request):

        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("Unauthenticated!")

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            response = Response()
            response.delete_cookie('jwt')
            return response

            # raise AuthenticationFailed("Unauthenticated!")

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response


@api_view(['GET'])
def getQuestions(request):
    questions = TriviaQuestion.objects.all()
    serializer = TriviaQuestionSerializer(questions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getQuestion(request, id):
    question = TriviaQuestion.objects.get(id=id)
    serializer = TriviaQuestionSerializer(question)
    return Response(serializer.data)


@api_view(['POST'])
def saveTriviaQuestion(request):

    for question in request.data:

        q = TriviaQuestion.objects.filter(
            question=question['question']).first()

        if not q:
            new_question = TriviaQuestion(**question)
            new_question.save()

    return Response({'message': 'success'})


@api_view(['GET'])
def getTriviaExamsResults(request):

    # Authenticates user
    token = request.COOKIES.get('jwt')
    if not token:
        raise AuthenticationFailed("Unauthenticated!")
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Unauthenticated!")
    user = User.objects.filter(id=payload['id']).first()

    results = TriviaExam.objects.filter(user=user).all()
    serializer = TriviaExamSerializer(results, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def saveTriviaExamResult(request):

    # Authenticates user
    token = request.COOKIES.get('jwt')
    if not token:
        raise AuthenticationFailed("Unauthenticated!")
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Unauthenticated!")
    user = User.objects.filter(id=payload['id']).first()

    triviaExam = TriviaExam(user=user, category=request.data['category'])
    triviaExam.save()

    for r in request.data['r']:
        q = TriviaQuestion.objects.filter(
            question=r['question']).first()
        triviaResult = TriviaQuestionResult(
            exam=triviaExam, question=q, result_correct=r['result_correct'])
        triviaResult.save()

    return Response({"message": "success"})
