from .views import (
    get_playlists, PlaylistSongsViews, SignUp, MyTokenObtainPairView, update_user_profile,
     DeleteSongFromPlaylist, CreatePlaylist, AddSongToPlaylist, get_user_profile
    )
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    # path('songs/', SongsViews.as_view()),
    path('playlists/', get_playlists),
    path('add-song-to-playlist/', AddSongToPlaylist.as_view()),
    path('create-playlist/', CreatePlaylist.as_view()),
    path('playlist/<int:id>', PlaylistSongsViews.as_view()),
    path('delete-song/playlist/', DeleteSongFromPlaylist.as_view()),
    path('users/update-profile/', update_user_profile, name='update_user_profile'),
    path('users/', get_user_profile, name='update_user_profile'),
    path('users/register/', SignUp.as_view(), name='register'),
    path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
