from rest_framework import generics, filters

from . import models
from . import serializers


class HeroList(generics.ListCreateAPIView):
    queryset = models.Hero.objects.all()
    serializer_class = serializers.HeroSerializer


class HeroDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Hero.objects.all()
    serializer_class = serializers.HeroSerializer


class TripList(generics.ListCreateAPIView):
    queryset = models.Trip.objects.all()
    serializer_class = serializers.TripSerializer
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('date',)
    ordering = ('-date',)


class TripDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Trip.objects.all()
    serializer_class = serializers.TripSerializer


class TeamList(generics.ListCreateAPIView):
    queryset = models.Team.objects.all()
    serializer_class = serializers.TeamSerializer


class TeamDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Team.objects.all()
    serializer_class = serializers.TeamSerializer


class UserList(generics.ListCreateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer


class ConfigList(generics.ListCreateAPIView):
    queryset = models.Config.objects.all()
    serializer_class = serializers.ConfigSerializer


class ConfigDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Config.objects.all()
    serializer_class = serializers.ConfigSerializer
