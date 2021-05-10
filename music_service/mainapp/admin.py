from django.contrib import admin
from .models import Profile, Song, Playlist

admin.site.register(Profile)
admin.site.register(Song)
admin.site.register(Playlist)