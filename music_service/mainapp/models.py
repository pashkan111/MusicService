from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser, UserManager
from django.urls import reverse
from django.core.exceptions import ValidationError
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import AbstractUser
from django.urls import reverse


class Profile(AbstractBaseUser):
    username = models.CharField(verbose_name='Логин', max_length=50, unique=True, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    email = models.EmailField(verbose_name='Email', unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = UserManager()

    def has_perms(self, perm, obj=None):
        return True

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'
        

class Playlist(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='playuser')
    song = models.ManyToManyField('Song', related_name='playsong', blank=True)

    def save(self, *args, **kwargs):
        if not self.name:
            self.name = 'Мой плейлист'
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Song(models.Model):
    title = models.CharField(max_length=100)
    performer = models.CharField(max_length=100)
    tags = models.CharField(max_length=100)
    important = models.BooleanField(default=False)

    def __str__(self):
        return self.title
