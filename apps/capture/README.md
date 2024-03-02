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

5. Install FFMPEG
    - **Windows**:
        1. [Download Windows build](https://www.gyan.dev/ffmpeg/builds/)
        2. Extract anywhere on the local machine
        3. Add the inner `bin` directory to `PATH`
    - **MacOS**: [*Refer to this link on using Brew*](https://formulae.brew.sh/formula/ffmpeg)