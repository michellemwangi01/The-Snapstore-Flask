from .app_factory import jsonify, request, url_for, csrf, Resource, User, SQLAlchemyError, make_response, FlaskForm, \
    FileField, send_from_directory, FileAllowed, FileRequired, create_app, Migrate, db, Api, UploadSet, SubmitField, \
    configure_uploads, IMAGES, Namespace, Marshmallow, fields, check_password_hash, datetime, uuid
from .app_factory import app, ma, api
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from .api_models import *
from .models import Category, Transaction, User, Photo, Cart, CartItem
import jwt
from functools import wraps
from marshmallow.exceptions import ValidationError


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

            # Create a cart for the newly registered user
            # new_cart = Cart(user=new_user)
            # db.session.add(new_cart)
            # db.session.commit()

            return new_user, 201
        else:
            return {'message': "No data found"}, 404

api.add_resource(Signup, '/signup')


class Login(Resource):
    def post(self):
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

            # Check if the user has a cart, if not, create one
            # user_cart = Cart.query.filter_by(user_id=user.id).first()
            # if not user_cart:
            #     new_cart = Cart(user=user)
            #     db.session.add(new_cart)
            #     db.session.commit()

            return jsonify({'token': token})

api.add_resource(Login, '/login')


@ns.route('/users')
class Users(Resource):
    # @token_required
    @ns.marshal_list_with(users_schema)
    def get(self):
        # if not current_user.admin:
        #     return jsonify({"message": "Sorry. You are not authorized to perform this function"})
        users = User.query.all()
        return users, 200


@ns.route('/users/<int:id>')
class UserByID(Resource):
    # @token_required
    @ns.marshal_with(user_schema)
    def get(self, id):
        # if not current_user.admin:
        #     return jsonify({"message": "Sorry. You are not authorized to perform this function"})
        user = User.query.filter_by(id=id).first()
        print(user.photos)
        return user, 200



@ns.route('/categories')
class Categories(Resource):
    @ns.marshal_list_with(category_schema)
    def get(self):
        categories = Category.query.all()
        return categories,200

@ns.route('/category/<int:id>')
class CategoryByID(Resource):
    @ns.marshal_with(category_schema)
    def get(self, id):
        category = Category.query.filter_by(id=id).first()
        return category,200

# @ns.route('/transactions')
# class Transactions(Resource):
#     @ns.marshal_list_with(transaction_schema)
#     def get(self):
#         transactions = Transaction.query.all()
#         print(transactions[1].photo)
#         return transactions,200


@ns.route('/photos')
class Photos(Resource):
    @ns.marshal_list_with(photo_schema)
    def get(self):
        photos = Photo.query.all()
        return photos,200

@ns.route('/cart/add/<int:photo_id>')
class AddToCart(Resource):
    # @token_required
    @ns.expect(cart_item_input_schema, validate=True)
    def post(self, photo_id, current_user):
        data = request.get_json()
        current = User.query.filter_by(id = current_user.id).first()
        print(current)

        # Check if the user has a cart, if not, create one
        try:
            user_cart = Cart.query.filter_by(user_id=current.id).first()
            if not user_cart:
                user = User.query.get(current.id)
                new_cart = Cart(user=user)
                db.session.add(new_cart)
                db.session.commit()
        except SQLAlchemyError as e:
            app.logger.error(str(e))
            return {"message": "Error creating cart for user"}, 500


        # Check if the photo exists
        photo = Photo.query.get(photo_id)
        if not photo:
            app.logger.error("Photo not found")
            return {"message":"Photo not found"}, 404

        # Check if the item is already in the cart
        existing_item = CartItem.query.filter_by(cart_id=user_cart.id, photo_id=photo_id).first()
        if existing_item:
            app.logger.error("Item is already in the cart")
            return {"message":"Item is already in the cart"}, 400

        # Add the item to the cart
        new_item = CartItem(cart=user_cart, photo=photo, quantity=data["quantity"])
        db.session.add(new_item)
        db.session.commit()
        app.logger.info("Item added to the cart successfully")
        return {"message": "Item added to the cart successfully"}, 201


@ns.route('/checkout')
class Checkout(Resource):
    # @token_required
    @ns.expect(transaction_input_schema)
    def post(self, current_user):
        data = request.get_json()


        # Check if the user has a cart
        user_cart = Cart.query.filter_by(user_id=current_user.id).first()
        if not user_cart:
            app.logger.error("User does not have a cart. Add items to the cart first.")
            return {"message":"User does not have a cart. Add items to the cart first."}, 400

        # Check if the item is in the user's cart
        cart_item = CartItem.query.filter_by(cart_id=user_cart.id, photo_id=data["photo_id"]).first()
        if not cart_item:
            app.logger.error( "Item is not in the cart")
            return {"message":"Item is not in the cart"}, 404
        
        try:

            # Create a transaction
            transaction = Transaction(
                photo_id=data["photo_id"],
                user_id=current_user.id, 
                cart_item_id =user_cart.id
                
            )
            db.session.add(transaction)
            db.session.commit()

            # Remove the item from the cart
            db.session.delete(cart_item)
            db.session.commit()

            return {"message": app.logger.info("Transaction completed successfully")}, 201
        except SQLAlchemyError as e:
            app.logger.error(str(e))
            return {"message": "Error Creating Transction"}

        # user_cart = Cart.query.filter_by(user_id=19).first()
        # if not user_cart:
        #     return {"message": app.logger.error("User does not have a cart. Add items to the cart first.")}, 400

        # # Check if the item is in the user's cart
        # cart_item = CartItem.query.filter_by(cart_id=user_cart.id, photo_id=data["photo_id"]).first()
        # if not cart_item:
            
        #     return {"message": app.logger.error( "Item is not in the cart")}, 404

        # # Create a transaction
        # transaction = Transaction(
        #     photo_id=data["photo_id"],
        #     user_id=1, 
        #     cart_item_id =cart_item.id
            
        # )
        # db.session.add(transaction)
        # db.session.commit()

        # # Remove the item from the cart
        # db.session.delete(cart_item)
        # db.session.commit()

        # return {"message": app.logger.error("Transaction completed successfully")}, 201