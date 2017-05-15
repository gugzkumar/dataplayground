# routing.py
from channels.routing import route,route_class,include
#from .consumers import ws_message, ws_add, ws_disconnect, ChatLobbyConsumer
from .consumers import ChatLobbyConsumer,ChatRoomConsumer


channels_routing = [
    #route("websocket.receive", ws_message),
    #include('DataPlayGround.routing.channels_routing')
    #route_class()
    #route("websocket.connect", ws_add),
    #route("websocket.receive", ws_message),
    #route("websocket.disconnect", ws_disconnect),
    route_class(ChatLobbyConsumer, path=r'^/chatlobby/$'),
    route_class(ChatRoomConsumer, path =r'^/chatlobby/(?P<room_id>\d+)/$')

]