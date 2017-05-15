from django.db import models
from django.contrib.auth.models import Permission, User
import json


class LogRegModel(models.Model):
    num_features = models.IntegerField()
    model_file = models.FileField(upload_to='models/logreg/')
    csv_file = models.FileField(upload_to='models/logreg/csv/')
    feature_list = models.CharField(max_length=1000)
    model_name = models.CharField(max_length=1000, unique=True)
    created_by = models.ForeignKey(User, default=1)
    def __str__(self):
        return self.model_name
    def get_feature_list(self):
        json.loads(self.feature_list)