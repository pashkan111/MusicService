from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import *
from rest_framework import viewsets, generics, permissions
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
Profile = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['name'] = self.user.name
        serializer = UserSerialiserWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerialiserWithToken(user, many=False)
    return Response(serializer.data)


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
                try:
                    new_user = Profile.objects.create_user(
                        name=name,
                        email=email,
                        password=password
                        )
                    new_user.save()
                except:
                    return Response({"Ошибка": "Пользователь не был создан"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'Ошибка': 'Пароли не совпадают'})
        return Response({f'Пользователь {name} был создан'})


class Logout(APIView):

    def get(self, request, format=None):
        request.user.auth_token.delete()
        return True

   
@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def get_playlists(request):
    queryset = Playlist.objects.all()
    serializer = PlaylistSerialiser(queryset, many=True)
    return Response(serializer.data)


class PlaylistSongsViews(generics.ListAPIView):
    serializer_class = SongSerialiser
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        id = self.kwargs.get('id')
        queryset = Playlist.objects.get(id=id)
        songs = queryset.song.all()
        return songs

PlaylistSerialiser
class DeleteSongFromPlaylist(APIView):
    serializer_class = SongSerialiser
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        playlist_id = self.kwargs.get('playlist_id')
        song_id = self.kwargs.get('song_id')
        playlist = Playlist.objects.filter(id=playlist_id)
        if playlist:
            song = Song.objects.filter(id=song_id)
            if song:
                playlist = playlist[0]
                playlist.song.remove(song)
                playlist.save()
                queryset = playlist.song.all()
            else:
                return Response({'Song is not found'})
        else:
            return Response({'Playlist is not found'})
        return queryset

    # def get(self):
