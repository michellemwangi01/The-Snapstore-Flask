from .app_factory import jsonify, request, url_for, csrf, Resource, User, SQLAlchemyError, make_response, FlaskForm, \
    FileField, send_from_directory, FileAllowed, FileRequired, create_app, Migrate, db, Api, UploadSet, SubmitField, \
    configure_uploads, IMAGES, Namespace, Marshmallow, fields, check_password_hash, datetime, uuid
from .app_factory import app, ma, api
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from .api_models import *
import jwt
from functools import wraps

ns = Namespace('api')
api.add_namespace(ns)


# -------------------------------------- A U T H E N T I C A T I O N ------------------------------
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return {"message": "Token is missing"}, 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.filterby(public_id=data['public_id']).first()
        except:
            return {"message": "token is invalid"}, 401

        return f(current_user, *args, **kwargs)

    return decorated


# -------------------------------------- R O U T E S ------------------------------

photos = UploadSet('photos', IMAGES)
configure_uploads(app, photos)


@ns.route('/')
class Home(Resource):
    def get(self):
        try:
            return {"message": "welcome to the snapstore_mine!"}, 200
        except Exception as e:
            return {'error': f'{str(e)}'}


class UploadForm(FlaskForm):
    photo = FileField(
        validators=[
            FileAllowed(photos, 'Only images are allowed'),
            FileRequired('File field should not be empty')]
    )
    submit = SubmitField('Upload')


@ns.route('/get_csrf_token')
class get_csrf_token(Resource):
    def get(self):
        csrf_token = csrf.generate_csrf()  # Generate the CSRF token
        return jsonify({'csrf_token': csrf_token})


class GetFile(Resource):
    def get(self, filename):
        return send_from_directory(app.config['UPLOADED_PHOTOS_DEST'], filename)


api.add_resource(GetFile, '/uploads/<filename>')


class UploadImage(Resource):
    def post(self, current_user):
        form = UploadForm()
        # if form.validate_on_submit():
        if form:
            filename = photos.save(form.photo.data)  # Save the image to the uploads folder
            file_url = url_for('get_file', filename=filename)
            return make_response(jsonify(file_url), 200)
        else:
            return make_response({"error": f"{form.errors}"}, 200)


api.add_resource(UploadImage, '/uploadimage')


class Signup(Resource):
    @ns.expect(user_input_schema)
    @ns.marshal_with(user_schema)
    def post(self):
        data = request.get_json()
        print(data)
        if data:
            new_user = User(
                username=data['username'],
                email=data['email'],
                public_id=str(uuid.uuid4())
            )
            new_user.set_password(data['password'])
            print(f'new user:{new_user}')
            new_user.set_password(data['password'])
            db.session.add(new_user)
            db.session.commit()
            print(new_user)
            return new_user, 201
        else:
            return {'message': "No data found"}, 404


api.add_resource(Signup, '/signup')


class Login(Resource):
    def get(self):
        auth = request.authorization

        if not auth or not auth.username or not auth.password:
            return make_response('Could Not Verify', 401)

        user = User.query.filter_by(username=auth.username).first()
        print(user)
        if not user:
            return make_response('Could Not Verify', 401)

        token_payload = {
            'public_id': user.public_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }

        if check_password_hash(user.password_hash, auth.password):
            token = jwt.encode(token_payload, app.config['SECRET_KEY'], algorithm='HS256')
            return jsonify({'token': token})


api.add_resource(Login, '/login')


# @ns.route('/users')
class Users(Resource):
    @token_required
    @ns.marshal_list_with(user_schema)
    def get(self, current_user):
        # if not current_user.admin:
        #     return jsonify({"message": "Sorry. You are not authorized to perform this function"})
        users = User.query.all()
        return users, 200


api.add_resource(Users, '/users')


# categories using flask_Restx
def handle_db_error(error):
    db.session.rollback()
    app.logger.error(str(e))
    return {'message':'Database error occurred'}, 500

@ns.route('/categories')
class Categories(Resource):
    @ns.marshal_with(categories_schema)
    def get(self):
        try:
            categories = Category.query.all()
            return {'categories': categories}, 200
        except SQLAlchemyError as e:
            handle_db_error(e)


    @ns.expect(category_schema)
    @ns.marshal_with(category_schema)
    def post(self):
        try:
            data = request.get_json()
            
            if data:
                new_category = Category(
                    name = data['name']
                )

                db.session.add(new_category)
                db.session.commit()
                return new_category, 201
            else:
                return {'message': 'No data Found'}, 404
        except SQLAlchemyErro as e:
            handle_db_error(e)

# single Category
@ns.route('/categories/<int:category_id>')
class CategoryResource(Resource):
    @ns.marshal_with(categories_schema)
    
    def get(self, category_id):
        try:
            category = Category.query.get(category_id)

            if category:
                return category, 200
            else:
                return {'message': 'Category not found'}, 404
        except SQLAlchemyError as e:
            handle_db_error(e)

    @ns.expect(category_schema)
    @ns.marshal_with(category_schema)
    def put(self, category_id):
        try:

            data = request.get_json()
            category = Category.query.get(category_id)

            if not category:
                return {'message': 'Category not found'}, 404
            
            if data:
                category.name = data['name']
                db.session.commit()
                return category, 200
            else:
                return {'message': 'No data found'}, 400

        except SQLAlchemyError as e:
            handle_db_error(e)

    def delete(self,category_id):
        try:
            category = Category.query.get(category_id)
            if not category:
                return {'message':'Category not found'}, 404
            db.session.delete()
            db.session.commit()
            return{'message': 'Category deleted Successfully'}, 200
        except SQLAlchemyError as e:
            handle_db_error(e)


