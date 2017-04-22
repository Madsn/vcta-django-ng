from channels.binding.websockets import WebsocketBinding

from . import models


class HeroBinding(WebsocketBinding):
    model = models.Hero
    stream = 'hero'
    fields = ['__all__']

    @classmethod
    def group_names(cls, instance):
        return ['hero-updates']

    def has_permission(self, user, action, pk):
        return True


class TripBinding(WebsocketBinding):
    model = models.Trip
    stream = 'trip'
    fields = ['__all__']

    @classmethod
    def group_names(cls, instance):
        return ['trip-updates']

    def has_permission(self, user, action, pk):
        return True


class TeamBinding(WebsocketBinding):
    model = models.Team
    stream = 'team'
    fields = ['__all__']

    @classmethod
    def group_names(cls, instance):
        return ['team-updates']

    def has_permission(self, user, action, pk):
        return True


class UserBinding(WebsocketBinding):
    model = models.User
    stream = 'user'
    fields = ['__all__']

    @classmethod
    def group_names(cls, instance):
        return ['user-updates']

    def has_permission(self, user, action, pk):
        return True
