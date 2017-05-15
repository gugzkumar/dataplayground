from django.db import models
from django.contrib.auth.models import Permission, User
from django.core.urlresolvers import reverse


# Create your models here.
class ChatRoom(models.Model):
    room_name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active =  models.BooleanField(default=False)

    def __str__(self):
        return self.room_name

class ChatMessage(models.Model):
    chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    message = models.CharField(max_length=500)
    created_by = models.ForeignKey(User, default=1)

    def __str__(self):
        return self.chat_room.room_name + '-'+self.created_by.username+'-'+self.created_at.strftime('%H:%M %m/%d/%Y')