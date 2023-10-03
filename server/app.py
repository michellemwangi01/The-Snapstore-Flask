#!/usr/bin/env python3
from app_factory import app
from routes import *

if __name__ == '__main__':
    app.run(debug=True, port=5555)
