import time
# import socketio

# with socketio.SimpleClient() as sio:
#     sio.connect("http://localhost:12345")
    
#     time.sleep(2)
    
#     print(sio.connected)
    
#     sio.emit('location', ("G53U8", (1,2,3), (4,5,6)))
#     time.sleep(2)

import socket 

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect to the server
client_socket.connect(("localhost", 12345))
print("Connected to the server")
while True:
    # Send data to the server
    data_to_send = f"G53U8;1,2,3;4,5,6"
    client_socket.send(data_to_send.encode('utf-8'))
    time.sleep(0.3)

# Close the connection
client_socket.close()