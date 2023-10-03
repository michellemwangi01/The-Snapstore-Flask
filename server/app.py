#!/usr/bin/env python3
from app.app_factory import app
from app.routes import *

if __name__ == '__main__':
    app.run(debug=True, port=5555)
