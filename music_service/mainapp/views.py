from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import *
from rest_framework import viewsets, generics, permissions, status
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

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

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = UserSerialiserWithToken(user, many=False)
    data = request.data
    user.name = data['name']
    user.email = data['email']
    user.save()
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerialiserWithToken(user, many=False)
    return Response(serializer.data)


class SignUp(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = request.data
        name = data['name']
        email = data['email']
        password = data['password']
        password2 = data['password2']
        if Profile.objects.filter(email=email).exists():
            message = {'Пользователь с таким email уже существует'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        if not password==password2:
            message = {'Ошибка': 'Пароли не совпадают'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        else:
            new_user = Profile.objects.create_user(
                name=name,
                email=email,
                password=password
                )
            serialiser = UserSerialiserWithToken(new_user, many=False)
        return Response(serialiser.data)


class Logout(APIView):
    def get(self, request, format=None):
        request.user.auth_token.delete()
        return True

   
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_playlists(request):
    user = request.user  
    try:
        queryset = Playlist.objects.filter(user=user)
        serializer = PlaylistSerialiser(queryset, many=True)
        return Response(serializer.data)
    except:
        return Response("error")


class PlaylistSongsViews(generics.ListAPIView):
    serializer_class = SongSerialiser
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        id = self.kwargs.get('id')
        queryset = Playlist.objects.get(id=id)
        songs = queryset.song.all()
        return songs


class SongsViews(APIView):
    serializer_class = SongSerialiser
    permission_classes = (permissions.AllowAny, )
    def get_queryset(self):
        if self.post.term:
            queryset = Song.objects.filter(title__icontains = self.post())
            serialiser = SongSerialiser(queryset, many=True)
            return Response(serialiser.data, status=status.HTTP_200_OK)
        else:
            queryset = Song.objects.all()
            serialiser = SongSerialiser(queryset, many=True)
            return Response(serialiser.data, status=status.HTTP_200_OK)

    def post(self, request):
        print(self.request.data)
        global term
        term = self.request.data.get('term')
        try:
            if term:
                queryset = Song.objects.filter(title__icontains = term)
                serialiser = SongSerialiser(queryset, many=True)
                return Response(serialiser.data, status=status.HTTP_200_OK)
            else:
                queryset = Song.objects.all()
                serialiser = SongSerialiser(queryset, many=True)
                return Response(serialiser.data, status=status.HTTP_200_OK)
        except:
            return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)




# @api_view(['GET', 'POST'])
# def SongsViews(request):
#     term = request.data.get('term')
#     if term:
#         queryset = Song.objects.filter(title__icontains = term)
#         serialiser = SongSerialiser(queryset, many=True)
#         return Response(serialiser.data, status=status.HTTP_200_OK)
#     else:
#         queryset = Song.objects.all()
#         serialiser = SongSerialiser(queryset, many=True)
#         return Response(serialiser.data, status=status.HTTP_200_OK)



class DeleteSongFromPlaylist(APIView):
    serializer_class = SongSerialiser
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        playlist_id = request.data.get('playlist_id')
        song_id = request.data.get('song_id')
        playlist = Playlist.objects.filter(id=playlist_id)
        if playlist:
            playlist = playlist[0]
            song = playlist.song.filter(id=song_id)
            if song:
                song = song[0] 
                playlist.song.remove(song)
                playlist.save()
            else:
                return Response({'Song is not found'})
        else:
            return Response({'Playlist is not found'})
        return Response({'ok'})


class CreatePlaylist(APIView):
    
    def post(self, request):
        user = request.user
        playlist_name = request.data.get('name')
        if Playlist.objects.filter(user=user, name=playlist_name).exists():
            return Response({'Плейлист с таким названием уже существует'})
        new_playlist = Playlist.objects.create(
            user=user,
            name=playlist_name
        )
        serialiser = PlaylistSerialiser(new_playlist, many=False)
        return Response(serialiser.data)


class AddSongToPlaylist(APIView):

    def post(self, request):
        # user = request.user
        print(request.data)
        playlist_id = request.data.get('playlist_id')
        song_id = request.data.get('song_id')
        playlist = Playlist.objects.filter( id=playlist_id)
        song = Song.objects.filter(id=song_id)
        if playlist and song:
            playlist = playlist[0]
            song = song[0]
            if song not in playlist.song.all():
                playlist.song.add(song)
                return Response({'Песня успешно добавлена'})
            else: 
                return Response({'Песня уже находится в плейлисте'})
        return Response({'Данные не получены'})


class SearchMisic(APIView):
    def post(self, request):
        term = request.data.get('term')
        print(request.data)
        queryset = Song.objects.filter(title__icontains=term)
        serialiser = SongSerialiser(queryset, many=True)
        print(serialiser.data)
        return Response(serialiser.data)


class DeletePlaylist(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request):
        user = self.request.user
        id = self.request.data.get('id')

        if user and id:
            Playlist.objects.filter(id=id).delete()
            print('deleted')
            return Response({'playlist has been deleted'})
        return Response({'smth went wrong'})
        
