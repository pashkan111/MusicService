from .views import get_playlists, playlist_detail, SignUp
from django.urls import path, include

urlpatterns = [
    path('playlists/', get_playlists),
    path('playlist/<int:id>', playlist_detail),
    path('signup/', SignUp.as_view(), name='signup'),
]
