from django.db.models import fields
from rest_framework import serializers
from .models import Profile, Playlist, Song

from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password')

    

class SongSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = '__all__'


class PlaylistSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = '__all__'
        depth = 1

