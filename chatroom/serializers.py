from rest_framework import serializers
from .models import ChatMessage

#CONVERTS MODELS TO JSON DATA
class ChatMessageSerializer(serializers.ModelSerializer):
    #room_name = serializers.StringRelatedField(source='chat_room', read_only=True)
    user_name = serializers.StringRelatedField(source='created_by', read_only=True)
    message_date =serializers.DateTimeField(source='created_at', format='%I:%M%p %m/%d/%Y')
    class Meta:
        model = ChatMessage
        fields= ['message', 'created_by', 'user_name','message_date', 'pk']
        # fields = '__all__'
