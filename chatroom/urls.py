from django.conf.urls import url
from . import views

app_name = "chatroom"

urlpatterns = [
    #/chatroom/
    url(r'^$', views.index, name = "index"),
]