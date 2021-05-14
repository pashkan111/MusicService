from django.db import models
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)

        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, name, password):
        user = self.create_user(email, name, password)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user

class Profile(AbstractBaseUser):
    name = models.CharField(verbose_name='Логин', max_length=50, null=True, blank=True)
    email = models.EmailField(verbose_name='Email', unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    objects = UserAccountManager()

    def has_perms(self, perm, obj=None):
        return True

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def get_full_name(self):
        if not self.name:
            return self.email.strip().rsplit('@', 1)
        return self.name
    
    def get_short_name(self):
        if not self.name:
            return self.email.strip().rsplit('@', 1)
        return self.name
    
    def __str__(self):
        return self.email  
        

class Playlist(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='playuser')
    song = models.ManyToManyField('Song', related_name='songs', blank=True)

    def save(self, *args, **kwargs):
        if not self.name:
            self.name = 'Мой плейлист'
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Song(models.Model):
    title = models.CharField(max_length=300)
    performer = models.CharField(max_length=300)
    tags = models.CharField(max_length=300)
    important = models.BooleanField(default=False)

    def __str__(self):
        return self.title
