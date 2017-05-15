# routing.py
from channels.routing import route, include


def ws_try(message):
    # ASGI WebSocket packet-received and send-packet message types
    # both have a "text" key for their textual data.
    message.reply_channel.send({
        "text": message.content['text'],
    })

channels_routing = [
    #route("websocket.receive", ws_try),
    include('chatroom.routing.channels_routing')
]