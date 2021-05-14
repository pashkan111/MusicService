from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from rest_framework import viewsets, generics, permissions
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied

Profile = get_user_model()

class SignUp(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        name = data['name']
        email = data['email']
        password = data['password']
        password2 = data['password2']
        if password==password2:
            if Profile.objects.filter(email=email).exists():
                return Response({'Пользователь с таким email уже существует'})
            else:
                new_user = Profile.objects.create_user(
                    name=name,
                    email=email,
                    password=password
                    )
                new_user.save()
        else:
            return Response({'Ошибка': 'Пароли не совпадают'})
        return Response({f'Пользователь {name} был создан'})

class Logout(APIView):

    def get(self, request, format=None):
        request.user.auth_token.delete()
        return True

# @api_view(['GET', 'POST'])
# def login(request):
    

@api_view(['GET', 'POST'])
def get_playlists(request):
    queryset = Playlist.objects.all()
    serializer = PlaylistSerialiser(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def playlist_detail(request, id):
    playlist = Playlist.objects.get(id=id)
    songs = playlist.song.all()
    
    serializer = SongSerialiser(songs, many=True)
    return Response(serializer.data)

