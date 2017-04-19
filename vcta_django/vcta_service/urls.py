from django.conf.urls import url

from . import views


app_name = 'vcta_service'
urlpatterns = [
    url(r'^hero/$', views.HeroList.as_view(), name='hero_list'),
    url(r'^hero/(?P<pk>\d+)$', views.HeroDetail.as_view(), name='hero_detail'),
    url(r'^trip/$', views.TripList.as_view(), name='trip_list'),
    url(r'^trip/(?P<pk>\d+)$', views.TripDetail.as_view(), name='trip_detail'),
]
