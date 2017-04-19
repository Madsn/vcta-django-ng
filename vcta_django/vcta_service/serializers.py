from rest_framework import serializers

from . import models

class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Hero
        fields = '__all__'


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Trip
        fields = '__all__'
