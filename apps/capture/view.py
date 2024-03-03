import time
import socketio

with socketio.SimpleClient() as sio:
    sio.connect("https://instructarapi.anga.dev/")
    
    time.sleep(2)
    
    print(sio.connected)
    sio.emit('identify', "view")
    time.sleep(2)