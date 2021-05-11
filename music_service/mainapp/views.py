from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from rest_framework import viewsets

# class PlaylistView(viewsets.ModelViewSet):
#     queryset = Playlist.objects.all()
#     serializer_class = PlaylistSerialiser
#     action_to_serialiser = {
#         'retrieve': PlaylistDetailSerialiser,
#         'list': PlaylistDetailSerialiser,
#     }

    # def get_serializer_class(self):
    #     return self.action_to_serialiser.get(
    #         self.action,
    #         self.serializer_class
    #     )


@api_view(['GET', 'POST'])
def get_playlists(request):
    queryset = Playlist.objects.all()
    serializer = PlaylistSerialiser(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def playlist_detail(request, id):
    playlist = Playlist.objects.get(id=id)
    serializer = PlaylistSerialiser(playlist, many=False)
    return Response(serializer.data)

