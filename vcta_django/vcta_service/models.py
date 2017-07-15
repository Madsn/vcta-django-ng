from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator


class Hero(models.Model):
    """
    Represents a Hero.
    """
    name = models.TextField()

    def __str__(self):
        return self.name


class User(AbstractUser):
    """
    Extends built-in user model.
    """
    full_name = models.CharField(max_length=30)
    team = models.ForeignKey('Team', null=True, blank=True)

    def __str__(self):
        return self.username


class Trip(models.Model):
    """
    Represents a Trip.
    """
    user = models.ForeignKey(User)
    date = models.DateField()
    distance = models.DecimalField(decimal_places=2, max_digits=5, validators = [MinValueValidator(0.01), MaxValueValidator(300)])
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username + " " + str(self.date) + " " + str(self.distance)


class Team(models.Model):
    """
    Represents a Team.
    """
    name = models.CharField(max_length=30)
    captain = models.ForeignKey(User, related_name="captain")

    def __str__(self):
        return self.name