from django.db import models


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
    name = models.TextField()

    def __str__(self):
        return self.name
