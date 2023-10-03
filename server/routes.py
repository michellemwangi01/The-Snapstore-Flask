from app_factory import jsonify, request, url_for, csrf, Resource, User, SQLAlchemyError, make_response, FlaskForm, \
    FileField, send_from_directory, FileAllowed, FileRequired, create_app, Migrate, db, Api, UploadSet, SubmitField, \
    configure_uploads, IMAGES, Namespace, Marshmallow, fields
from app_factory import app, ma, api
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from api_models import *
ns = Namespace('api')
api.add_namespace(ns)





# -------------------------------------- R O U T E S ------------------------------

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
class GetFile(Resource):
    def get(self, filename):
        return send_from_directory(app.config['UPLOADED_PHOTOS_DEST'], filename)


api.add_resource(GetFile, '/uploads/<filename>')


class get_csrf_token(Resource):
    def get(self):
        csrf_token = csrf.generate_csrf()  # Generate the CSRF token
        return jsonify({'csrf_token': csrf_token})


api.add_resource(get_csrf_token, '/get_csrf_token')


class UploadImage(Resource):
    def post(self):
        form = UploadForm()
        # if form.validate_on_submit():
        if form:
            filename = photos.save(form.photo.data)  # Save the image to the uploads folder
            file_url = url_for('get_file', filename=filename)
            return make_response(jsonify(file_url), 200)
        else:
            return make_response({"error": f"{form.errors}"}, 200)


api.add_resource(UploadImage, '/uploadimage')

@ns.route('/signup')
class Signup(Resource):
    @ns.expect(user_input_schema)
    @ns.marshal_with(user_schema)
    def post(self):
        print('posting')
        try:
            new_user = User(
                username=request.form.get('username'),
                email=request.form.get('email'),
                profile_pic=request.form.get('profile_pic'),
            )
            print(new_user)
            new_user.password_hash = new_user.set_password(request.form.get('password'))
            db.session.add(new_user)
            db.session.commit()
            print(new_user)
            return new_user, 201
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 400)
    # else:
    #     response = {"message": "No data provided"}
    #     return make_response(jsonify(response), 404)


api.add_resource(Signup, '/signup')
