from django.views.generic import View
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.template import loader
from django.http import Http404
from django.contrib.auth import authenticate
from django.contrib.auth import login,logout
from .forms import UserForm
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth.models import User
# Create your views here.


def index(request):
    if not request.user.is_authenticated():
        return redirect("users:login_user")
    else:
        return redirect('users:user_home')

def base(request):
    return render(request, "base.html")


@api_view(['POST'])
def create_auth(request):
    serialized = UserSerializer(data=request.DATA)
    if serialized.is_valid():
        User.objects.create_user(
            serialized.init_data['email'],
            serialized.init_data['username'],
            serialized.init_data['password']
        )
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)



def login_user(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user);
                #return render(request, 'users/userpage.html')
                return redirect('users:user_home')
            else:
                return render(request, 'users/loginform.html', {'error_message': 'Your account has been disabled'})
        else:
            return render(request, 'users/loginform.html', {'error_message': 'Invalid login'})

    if not request.user.is_authenticated():
        return render(request, 'users/loginform.html')
    else:
        return redirect('users:user_home')
        #return render(request, 'users/userpage.html')

def logout_user(request):
    logout(request)
    return render(request, 'users/loginform.html')

def user_home(request):
    if not request.user.is_authenticated():
        return redirect("users:login_user")
    else:
        return render(request, 'users/userpage.html')