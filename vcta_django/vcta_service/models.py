from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Hero(models.Model):
    """
    Represents a Hero.
    """
    name = models.TextField()

    def __str__(self):
        return self.name


class Trip(models.Model):
    """
    Represents a Trip.
    """
    user = models.ForeignKey(User)
    date = models.DateField()
    distance = models.DecimalField(decimal_places=2, max_digits=5, validators = [MinValueValidator(0.01), MaxValueValidator(300)])

    def __str__(self):
        return self.user.username + " " + str(self.date) + " " + str(self.distance)
