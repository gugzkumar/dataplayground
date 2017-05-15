from django.conf.urls import url
from . import views

app_name = "users"

urlpatterns = [
    #/users
    url(r'^$', views.index, name = "index"),

    #/users/base
    url(r'^base/$', views.base, name = "base"),

    #/users/login_user
    url(r'^login_user/$', views.login_user, name='login_user'),

    #/users/logout_user
    url(r'^logout_user/$', views.logout_user, name='logout_user'),

    #users/user_home
    url(r'^user_home/$', views.user_home, name='user_home')
]