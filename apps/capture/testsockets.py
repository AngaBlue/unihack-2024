import time
import socketio

with socketio.SimpleClient() as sio:
    sio.connect("http://localhost:3000")
    
    time.sleep(2)
    
    print(sio.connected)
    sio.emit('anevent', "hello")
    time.sleep(2)