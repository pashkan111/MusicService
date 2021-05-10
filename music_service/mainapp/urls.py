from .views import get_playlists, playlist_detail
from .views import PlaylistView
from django.urls import path, include

urlpatterns = [
    path('playlists/', get_playlists),
    # path('playlists/', PlaylistView.as_view()),
    path('playlist/<int:id>', playlist_detail),
]

from rest_framework import routers

router = routers.SimpleRouter()
# router.register('song', CategoryView, basename='category')
# router.register('song', SongView, basename='song')
# router.register('playlists', PlaylistView, basename='playlist')


# urlpatterns = []

# urlpatterns += router.urls