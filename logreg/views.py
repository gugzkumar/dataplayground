from django.shortcuts import render, get_object_or_404,redirect
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.serializers import Serializer,CharField, ListField,IntegerField,DictField
from .models import LogRegModel
from .serializers import LogRegModelGetSerializer,LogRegModelPostSerializer
import pickle
from rest_framework import status
import json
# Create your views here.

def index(request):
    if not request.user.is_authenticated():
        return redirect("users:login_user")
    else:
        return render(request, "logreg/index.html")

class LogRegView(viewsets.ModelViewSet):
    def get_serializer_class(self, *args, **kwargs):
        if(self.action in ['list','retrieve']):
            return LogRegModelGetSerializer
        else:
            return LogRegModelPostSerializer
    def get_queryset(self):
        return LogRegModel.objects.filter(created_by=self.request.user)
    queryset = LogRegModel.objects.all()


class RunModelSerializer(Serializer):
    model_name = CharField(max_length=10)
    feature_list = CharField(max_length=500)

class RunModelApiView(APIView):
    #serializer_class = RunModelSerializer
    def post(self, request):
        serializer = RunModelSerializer(data=request.data)
        if(serializer.is_valid()):
            if (LogRegModel.objects.filter(model_name=serializer.data.get('model_name')).exists()):
                logregmodel = LogRegModel.objects.get(model_name=serializer.data.get('model_name'))
                lm = pickle.load(logregmodel.model_file.file)
                try:
                    features = json.loads(serializer.data.get('feature_list'))
                except:
                    return Response({'message': 'Please adjust your JSON format. Make sure you have a list of numbers'},
                                    status.HTTP_400_BAD_REQUEST)
                if(len(features) != logregmodel.num_features):
                    return Response({'message': 'Expecting '+str(logregmodel.num_features)+
                                                ' features, got ' + str(len(features))},
                                    status.HTTP_400_BAD_REQUEST)
                features = list(map(lambda x: float(x),features))
                prediction = round(lm.predict(features)[0],6)
                return Response({'prediction':prediction})
            else:
                return Response({'message':'Model Not Found'}, status.HTTP_404_NOT_FOUND)
        else:
            return Response({'message':'Got Bad Request'}, status.HTTP_400_BAD_REQUEST)