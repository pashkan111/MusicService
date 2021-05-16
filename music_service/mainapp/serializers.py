from django.db.models import fields
from rest_framework import serializers
from .models import Profile, Playlist, Song
from rest_framework_simplejwt.tokens import RefreshToken
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


class UserSerialiser(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only = True)
    is_admin = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'is_admin')

    def get_name(self, obj):
        name = obj.name
        if not name:
            name = obj.get_full_name()
        return name
    
    def get_is_admin(self, obj):
        return obj.is_superuser

class UserSerialiserWithToken(UserSerialiser):
    token = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'is_admin', 'token')

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)