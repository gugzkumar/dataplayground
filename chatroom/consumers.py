# consumers.py

from channels.generic.websockets import JsonWebsocketConsumer, WebsocketConsumer
#from channels import Group
#from channels.message import Message
#from channels.auth import channel_session_user_from_http, channel_session_user
from .models import ChatRoom, ChatMessage
from .serializers import ChatMessageSerializer
from django.contrib.auth.models import User

class ChatLobbyConsumer(JsonWebsocketConsumer):
    http_user = True

    def connection_groups(self, **kwargs):
        return ['CHAT_LOBBY']

    def connect(self, message, **kwargs):
        message.reply_channel.send({"accept": True})

    def receive(self, content, **kwargs):
        """
        Called when a message is received with decoded JSON content
        """
        # Simple echo
        #self.send(content)
        #print(content)
        if('action' in content and content['action']== 'get_room_list' and self.message.user.is_authenticated()):
            #room_list = list(ChatRoom.objects.values_list('room_name', flat=True))
            room_list = list(ChatRoom.objects.values('room_name','pk'))
            users = list(User.objects.values_list('username',flat=True))
            #print(room_list)
            self.group_send('CHAT_LOBBY', {'status':'OK', 'room_list':room_list, 'user_list':users})
        else:
            self.group_send('CHAT_LOBBY', {'status':'ERROR', 'message': 'Invalid Action or User Is not Logged In'})

    def disconnect(self, message, **kwargs):
        """
        Perform things on connection close
        """
        pass
        #print(message.user.username + ' Disconnected')

class ChatRoomConsumer(JsonWebsocketConsumer):
    http_user = True

    def connection_groups(self, **kwargs):
        #print('HERE')
        return ["room-{0}".format(kwargs['room_id'])]
        #return ChatRoom.objects.values_list('room_name')

    def connect(self, message, **kwargs):
        #print(kwargs['room_id'] +' HERE')
        if(ChatRoom.objects.filter(pk=kwargs['room_id']).exists()):
            message.reply_channel.send({"accept": True})
            #print(message.user.username + ' Connected')
        else:
            message.reply_channel.send({"accept": False})
            #print(message.user.username + ' Disconnected')

    def receive(self, content, **kwargs):
        #print(content)
        room_id = kwargs['room_id']
        room = ChatRoom.objects.filter(pk=room_id)
        if(self.message.user.is_authenticated() and room.exists() and 'action' in content):
            if(content['action'] == 'get_message_history'):
                message_list = ChatRoom.objects.get(pk = room_id).chatmessage_set.all()
                message_list.order_by('created_at')
                serializer = ChatMessageSerializer(message_list, many=True)
                self.send({'status':'OK', 'type':'REFRESH'
                    ,'messages':serializer.data, 'room_name':room[0].room_name})
                #self.group_send("room-{0}".format(room_id),{'status':'OK', 'type':'REFRESH'
                    #,'messages':serializer.data, 'room_name':room[0].room_name})
            elif(content['action'] == 'send_message'):
                message = ChatMessage.objects.create(
                    chat_room=room[0],
                    created_by = self.message.user,
                    message = content['message']
                )
                message.save()
                #message.chat_room= room
                #message.created_by= self.message.user
                #message.message= content[message]
                serializer = ChatMessageSerializer(message)
                self.group_send("room-{0}".format(room_id), {'status': 'OK', 'type': 'NEWMESSAGE',
                                'message':serializer.data, 'room_name': room[0].room_name})
                #self.group_send("room-{0}".format(room_id), {'status': 'OK', 'type': 'NEWMESSAGE'
                #    , 'messages': serializer.data, 'room_name': room[0].room_name})
                pass
            else:
                self.group_send("room-{0}".format(room_id), {'status':'ERROR', 'message': 'Invalid Action'})
        else:
            self.group_send("room-{0}".format(room_id), {'status': 'ERROR', 'message': 'Invalid Room/Unauthenticated User/No action'})
    def disconnect(self, message, **kwargs):
        pass
        #print(message.user.username + ' Disconnected From Room '+ kwargs['room_id'])


'''
# Connected to websocket.connect
@channel_session_user_from_http
def ws_add(message):
    message.reply_channel.send({"accept": True})
    Group("chat-%s" % message.user.username[0]).add(message.reply_channel)

# Connected to websocket.receive
@channel_session_user
def ws_message(message):
    Group("chat-%s" % message.user.username[0]).send({
        "text": message['text']+' '+message.user.username,
    })

# Connected to websocket.disconnect
@channel_session_user
def ws_disconnect(message):
    Group("chat-%s" % message.user.username[0]).discard(message.reply_channel)

'''


'''
def ws_message(message):
    # ASGI WebSocket packet-received and send-packet message types
    # both have a "text" key for their textual data.
    message.reply_channel.send({
        "text": message.content['text'],
    })
'''
