import json
import math
import os
import socket
from statistics import mean
import threading
from timeit import default_timer
from flask import Flask
from mss import mss
import pygetwindow as gw
import pyautogui
import cv2
import ffmpeg
import numpy as np
import socketio

# Find the window you want to capture
window_title = "Quest 3"  # Change this to the title of your window
windows = gw.getWindowsWithTitle(window_title)

if len(windows) == 0:
    print(f"There is no window open with title: '{window_title}'.")
    exit()

elif len(windows) > 1:
    print(f"There are too many windows open with title: '{window_title}'. Ambiguous capture.")
    exit()

window = windows[0]

ss = mss()


def get_bbox_from_window(window) -> np.ndarray:
    return np.array([
        window.left,
        window.top,
        window.left + window.width,
        window.top + window.height
    ])


def get_bbox_from_crop(crop: dict) -> np.ndarray:
    return np.array([
        crop['left'],
        crop['top'],
        -crop['right'],
        -crop['bottom']
    ])


def get_dims_from_bbox(bbox):
    return {
        'left': bbox[0],
        'top': bbox[1],
        'width': bbox[2] - bbox[0],
        'height': bbox[3] - bbox[1]
    }


# Function to capture window content
def capture_window(window, crop: dict):
    
    # x, y, width, height = window.left, window.top, window.width, window.height
    try:
        bbox = (get_bbox_from_window(window) + get_bbox_from_crop(crop)).tolist()

        # d = get_dims_from_bbox(bbox)
        
        screenshot = ss.grab(tuple(bbox))

        frame = np.array(screenshot)
        return frame
    
    except Exception as e:
        print(f"!!! - {e}")
        return None

# Stream settings - Update with your server details
# stream_url = 'your_server_url'
# stream_key = 'your_stream_key'
# # Initialize the ffmpeg stream
# command = (
#     ffmpeg
#     .input('pipe:', format='rawvideo', pix_fmt='rgb24', s='{}x{}'.format(window.width, window.height))
#     .output(stream_url, vcodec='libx264', pix_fmt='yuv420p', preset='ultrafast', f='flv', stream_key=stream_key)
#     .overwrite_output()
#     .run_async(pipe_stdin=True)
# )

# Capture and stream the window content

SETTINGS_PATH = 'settings.json'

def rotate_image(image, angle):
  image_center = tuple(np.array(image.shape[1::-1]) / 2)
  rot_mat = cv2.getRotationMatrix2D(image_center, angle, 1.0)
  result = cv2.warpAffine(image, rot_mat, image.shape[1::-1], flags=cv2.INTER_LINEAR)
  return result


def load_settings(path: str) -> dict:
    if os.path.exists(path):
        with open(path, 'r') as f:
            return json.loads(f.read())

    raise FileNotFoundError(path)


def apply_transformations(frame: np.ndarray, transformations: dict):
    return rotate_image(frame, transformations['rotate']) if frame is not None else None

current_frame: np.ndarray = None

def main():
    global current_frame

    running = True

    settings = load_settings(SETTINGS_PATH)

    def headset_communication_thread():
        global current_frame

        # Create a socketIO server
        # sio_headset = socketio.Server(async_mode="threading")

        # # wrap with a WSGI application
        # app = Flask(__name__)
        # app.wsgi_app = socketio.WSGIApp(sio_headset, app.wsgi_app)

        sio_to_backend = socketio.SimpleClient()
        sio_to_backend.connect(settings['connection']['backend'])\
        
        sio_to_backend.emit("identify", "capture")



        # Server (i.e., headset) events
        # @sio_headset.on("location")
        # def on_location(sid, token: str, location: tuple[float], direction: tuple[float]):
        #     print(f"The SID is: {sid}")
        #     print(token, location, direction)
        #     payload = cv2.imencode(".jpeg", current_frame, [cv2.IMWRITE_JPEG_QUALITY, 10])[1].tobytes()
        #     sio_to_backend.emit("newFrame", (token, payload, location, direction))
            
        server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        # Bind the socket to a specific address and port
        server_socket.bind(("0.0.0.0", settings['connection']['socket-port']))

        # Listen for incoming connections
        server_socket.listen()

        # Accept a connection from a client
        client_socket, client_address = server_socket.accept()
        while running:
            
            print(f"Connection from {client_address}")

            # Receive and print data from the client
            data = client_socket.recv(1024).decode('utf-8').split(';')
            
            token, location, direction = (data[0], [int(v) for v in data[1].split(',')], [int(v) for v in data[2].split(',')])

            print(token, location, direction)

            payload = cv2.imencode(".jpeg", current_frame)[1].tobytes()

            sio_to_backend.emit("newFrame", (token, payload, location, direction))

        # app.run("0.0.0.0", settings['connection']['socket-port'])
        ################################

    threading.Thread(target=headset_communication_thread).start()
    
    prev_time = default_timer()
    last_report = default_timer()
    framerates = []

    last_settings_load = prev_time

    

    try: window.activate()
    except: pass

    while True:
        current_frame = apply_transformations(
            capture_window(
                window,
                settings['crop']
            ),
            
            settings['transformation']
        )
        
        if current_frame is not None: cv2.imshow("Ree", current_frame)
        
        curr_time = default_timer()

        # Get framerate
        framerate = 1 / (curr_time - prev_time)

        prev_time = curr_time

        if curr_time - last_settings_load > settings['timing']['settings']:
            settings = load_settings(SETTINGS_PATH)
            print("Reloaded settings!")
            last_settings_load = curr_time


        if curr_time - last_report > settings['timing']['framerate']:
            print(mean(framerates) if framerates else 0)
            framerates = []
            last_report = curr_time

        else:
            framerates.append(framerate)
        

        if (cv2.waitKey(1) & 0xFF) == ord('q'): break

    running = False

    cv2.destroyAllWindows()

if __name__ == "__main__": 
    try:
        main()
    except KeyboardInterrupt:
        quit()