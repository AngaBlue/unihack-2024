# Capture
The capture tool is a Python-based application that captures camera feeds and streams them to the backend server.  In order to make the resultant video feed more useful, the capture tool also performs image processing and compression before sending the feed to the server along with the position & orientation of the headset.

## Setup

1. Install Python `v3.11.X`
    - Tested with Python `v3.11.3`

2. Create a virtual environment
    - **Windows**: `py -m venv venv`
    - **MacOS**: `python3 -m venv venv`

3. Activate the virtual environment
    - **Windows**: `.\venv\Scripts\activate`
    - **MacOS**: `source ./venv/bin/activate`

4. Install requirements
    - **Windows**: `py -m pip install -r requirements.txt`
    - **MacOS**: `python3 -m pip install -r requirements.txt`
