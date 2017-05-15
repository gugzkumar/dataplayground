import pandas as pd
from .models import LinRegModel
from rest_framework import serializers
import json
import pickle
from sklearn.linear_model import LinearRegression
from django.core.files.base import File
from io import BytesIO

class LinRegModelGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinRegModel
        fields = ('pk','model_name')
        #exclude = ('feature_list',)

class LinRegModelPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinRegModel
        fields = ('model_name','csv_file','pk')
        #exclude = ('feature_list',)
    def create(self, validated_data):
        model_name = validated_data['model_name']
        csv = validated_data['csv_file']
        df = pd.read_csv(csv)
        linreg_model = LinearRegression()
        linreg_model.fit(df[df.columns[0:-1]],df[df.columns[-1]])
        num_features = len(df.columns)-1
        feature_list = json.dumps(list(df.columns[0:-1]))
        model_file = File(BytesIO(pickle.dumps(linreg_model)))
        linreg_model.predict([1,1,1])
        print(model_file)
        obj = LinRegModel.objects.create(num_features=num_features,
                                   model_name=model_name,
                                   feature_list = feature_list,
                                   #model_file =model_file,
                                   csv_file = csv,
                                   )
        obj.model_file.save((model_name +'.p'),model_file,save=True)
        obj.save()
        return obj