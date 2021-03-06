from django.conf.urls import url, include
from rest_framework import routers
from . import views

app_name = "linreg"
router = routers.DefaultRouter()
router.register('models', views.LinRegView,)

urlpatterns = [
    url(r'^$', views.index, name = "index"),
    url(r'^api/', include(router.urls)),
    url(r'^api/runmodel/$', views.RunModelApiView.as_view()),
]