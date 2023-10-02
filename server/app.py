#!/usr/bin/env python3
import datetime
from flask import Flask, send_from_directory, url_for
# from flask_cors import CORS
from flask_migrate import Migrate
from sqlalchemy import MetaData
from flask import make_response, request, jsonify
from flask_restful import Resource, Api
from sqlalchemy.exc import SQLAlchemyError
from flask_uploads import UploadSet, configure_uploads, IMAGES
from flask_wtf import FlaskForm, csrf
from flask_wtf.file import FileAllowed, FileField, FileRequired
from wtforms import SubmitField
from werkzeug.security import generate_password_hash, check_password_hash
# from werkzeug.utils import secure_filename
# from werkzeug.datastructures import FileStorage
from app_factory import create_app, db

app = create_app()
migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)

photos = UploadSet('photos', IMAGES)
configure_uploads(app, photos)


class UploadForm(FlaskForm):
    photo = FileField(
        validators=[
            FileAllowed(photos, 'Only images are allowed'),
            FileRequired('File field should not be empty')]
    )
    submit = SubmitField('Upload')



@app.route('/uploads/<filename>')
def get_file(filename):
    return send_from_directory(app.config['UPLOADED_PHOTOS_DEST'], filename)


@app.route('/get_csrf_token', methods=['GET'])
def get_csrf_token():
    csrf_token = csrf.generate_csrf()  # Generate the CSRF token
    return jsonify({'csrf_token': csrf_token})


@app.route('/', methods=['GET', 'POST'])
def upload_image():
    if request.method == 'POST':
        form = UploadForm()
        # if form.validate_on_submit():
        if form:
            filename = photos.save(form.photo.data)  # Save the image to the uploads folder
            file_url = url_for('get_file', filename=filename)
            return make_response(jsonify(file_url), 200)
        else:
            return make_response({"error": f"{form.errors}"}, 200)
    else:
        return make_response(jsonify({'error': 'Form validation failed'}), 400)


if __name__ == '__main__':
    app.run(debug=True, port=5555)
