from django.contrib import admin
from .models import Profile, Song, Playlist

admin.site.register(Profile)
admin.site.register(Song)
admin.site.register(Playlist)
from django.contrib.sessions.models import Session
class SessionAdmin(admin.ModelAdmin):
    ordering=('-session_data',)
    def _session_data(self, obj):
        return obj.get_decoded()
    list_display = ['session_key', '_session_data', 'expire_date']
admin.site.register(Session, SessionAdmin)