from .views import get_playlists, PlaylistSongsViews, SignUp, MyTokenObtainPairView, getUserProfile
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    # path('songs/', SongsViews.as_view()),
    path('playlists/', get_playlists),
    path('playlist/<int:id>', PlaylistSongsViews.as_view()),
    path('users/profile/', getUserProfile, name='getUserProfile'),
    path('users/register/', SignUp.as_view(), name='register'),
    path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
