from channels.routing import route_class

from vcta_service.consumers import Demultiplexer


channel_routing = [
    route_class(Demultiplexer, path="^/api/ws"),
]
