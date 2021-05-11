from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import Profile, Playlist, Song


class SongSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = '__all__'


class PlaylistSerialiser(serializers.ModelSerializer):
    # songs = serializers.PrimaryKeyRelatedField(many=True,)
    class Meta:
        model = Playlist
        fields = '__all__'
        depth = 1


# class PlaylistDetailSerialiser(serializers.ModelSerializer):
#     songs = serializers.SerializerMethodField()
#     class Meta:
#         model = Playlist
#         fields = '__all__'

#     @staticmethod
#     def get_songs(obj):
#         return SongSerialiser(Playlist.objects.filter('song'), many=True).data
