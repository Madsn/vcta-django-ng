from django.core.exceptions import ValidationError
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator


def validate_only_one_instance(obj):
    model = obj.__class__
    if (model.objects.count() > 0 and
            obj.id != model.objects.get().id):
        raise ValidationError("Can only create 1 %s instance" % model.__name__)


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
    distance = models.DecimalField(decimal_places=2, max_digits=5,
                                   validators=[MinValueValidator(0.01), MaxValueValidator(300)])
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


class Config(models.Model):
    """
    Store settings (admin use). Will contain only a single row.
    It would be more elegant to use constance or similar package for storing editable settings in django -
    but this is the simplest way to have the settings available through Django-rest-framework.
    """
    team_management_enabled = models.BooleanField(default=True, null=False,
                                                  help_text="Allow team management - creating teams, sending "
                                                            "invitations, accepting invitations.")
    trip_management_enabled = models.BooleanField(default=True, null=False,
                                                  help_text="Allow adding/deleting of trips")
    flash_message = models.TextField(default=None, blank=True, null=True,
                                     help_text="Message to show at the top of every page")
    welcome_message = models.TextField(default=None, blank=True, null=True,
                                       help_text="Additional welcome message on login page")

    def clean(self):
        """
        Don't allow saving more than 1 config row
        """
        validate_only_one_instance(self)
