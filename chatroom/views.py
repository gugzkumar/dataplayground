from django.views.generic import View
from django.shortcuts import render, get_object_or_404,redirect
from django.contrib.auth import authenticate
from django.contrib.auth import login,logout
# Create your views here.

def index(request):
    if not request.user.is_authenticated():
        #return render(request, "users/loginform.html")
        return redirect("users:login_user")
    else:
        return render(request, "chatroom/index.html")