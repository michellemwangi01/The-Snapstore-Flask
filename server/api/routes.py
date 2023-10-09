from api import jsonify, request, url_for, csrf, Resource, User, SQLAlchemyError, make_response, FlaskForm, \
    FileField, send_from_directory, FileAllowed, FileRequired, Migrate, db, Api, UploadSet, SubmitField, \
    configure_uploads, IMAGES, Namespace, Marshmallow, fields, check_password_hash, datetime, uuid
from api import app, ma, api
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from .api_models import *
from .models import Category, Transaction, User, Photo, Cart, CartItem
import jwt, os
from functools import wraps
from marshmallow.exceptions import ValidationError
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


ns = Namespace('snapstore')
api.add_namespace(ns)
jwt = JWTManager(app)



# -------------------------------------- A U T H E N T I C A T I O N ------------------------------
# from jwt.exceptions import ExpiredSignatureError, DecodeError
import jwt  # Make sure you have the jwt library imported

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')

        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split('Bearer ')[1]
            print(token)
        if not token:
            return {"message": "Token is missing"}, 401
        
        try:
            print(app.config['SECRET_KEY'])
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])  # Specify the algorithm here
            # token = jwt.encode(token_payload, app.config['SECRET_KEY'], algorithm='HS256')

            current_user = User.query.filter_by(public_id=data['public_id']).first()
            if not current_user:
                return {"message": "User not found"}, 401
            print(current_user)
        except Exception:
            return {"message": "Token has expired"}, 401
        except Exception as e:
            return {"message": f"{e}"}, 401

        return f(current_user, *args, **kwargs)

    return decorated


# -------------------------------------- R O U T E S ------------------------------

photos = UploadSet('photos', IMAGES)
configure_uploads(app, photos)

UPLOAD_FOLDER = "uploads"  # Folder where the uploaded images will be stored
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

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

@ns.route('/uploadimage')
class UploadImage(Resource):
    def post(self):
        # form = UploadForm()
        # if form.validate_on_submit():
        try:
            file = request.files("image")
            if file:
                # filename = photos.save(form.photo.data)  # Save the image to the uploads folder
                # file_url = url_for('get_file', filename=filename)
                filename = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
                file.save(filename)
                return make_response(jsonify(filename), 200)
            else:
                return {"message": "No file uploaded"}, 400
        except Exception as e:
            return {"message": str(e)}, 500

# api.add_resource(UploadImage, '/uploadimage')


@ns.route('/signup')
class Signup(Resource):
    @ns.expect(user_input_schema)
    @ns.marshal_with(user_schema)
    def post(self):
        data = request.get_json()
        # print("signup",data)
        if data['password'] == data['repeatPassword']:
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
                print("new added user",new_user)
                return new_user, 201
            else:
                return {'message': "No data found"}, 404
        # if data:
        #     new_user = User(
        #         username=data['username'],
        #         email=data['email'],
        #         public_id=str(uuid.uuid4())
        #     )
        #     new_user.set_password(data['password'])
        #     print(f'new user:{new_user}')
        #     new_user.set_password(data['password'])
        #     db.session.add(new_user)
        #     db.session.commit()
        #     print(new_user)

            # Create a cart for the newly registered user
            # new_cart = Cart(user=new_user)
            # print("user cart", new_cart)
            # db.session.add(new_cart)
            # db.session.commit()

            # return new_user, 201
        else:
            return {'message': "No data found"}, 404


@ns.route('/login')
class Login(Resource):
    @ns.expect(user_login_schema)
    def post(self):
        data = request.get_json()

        if not data or not data['username'] or not data['password']:
            return {'message': 'Could Not Verify'}, 401

        user = User.query.filter_by(username=data['username']).first()

        if not user:
            return {'message': 'Could Not Verify'}, 401

        token_payload = {
            'public_id': user.public_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }

        if check_password_hash(user.password_hash, data['password']):
            access_token = create_access_token(identity=user.id)
            response_data = {
                'user_id': user.id,
                'access_token': access_token,
                'username': user.username
            }

            # Check if the user has a cart, if not, create one
            user_cart = Cart.query.filter_by(user_id=user.id).first()
            if not user_cart:
                try:
                    new_cart = Cart(user=user)
                    db.session.add(new_cart)
                    db.session.commit()
                    print(f"Cart created for user {user.id}")
                except Exception as e:
                    db.session.rollback()
                    return {'message': f'Error creating cart for user {user.id}: {str(e)}'}, 500

            return response_data, 201
        else:
            return jsonify({'message': 'Invalid credentials'}), 401



@ns.route('/users')
class Users(Resource):
    @token_required
    @ns.marshal_list_with(users_schema)
    def get(self):
        # if not current_user.admin:
        #     return jsonify({"message": "Sorry. You are not authorized to perform this function"})
        users = User.query.all()
        return users,200


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

@ns.route('/transactions')
class Transactions(Resource):
    @jwt_required()
    @ns.marshal_list_with(transaction_schema)
    def get(self):
        current_user = get_jwt_identity()
        print(f'current_user: {current_user}')
        transactions = Transaction.query.filter_by(user_id=current_user).all()
        return transactions,200

@ns.route('/transaction/<int:id>')
class Transactionbyid(Resource):
    @ns.marshal_list_with(transaction_schema)
    def get(self ,id):
        transaction = Transaction.query.filter_by(id=id).first()
        # print(transaction)
        return transaction,200
    
@ns.route('/transactions/<int:id>')
class Deletetransaction(Resource):   
    def delete(self ,id):
        transaction = Transaction.query.filter_by(id=id).first()
        db.session.delete(transaction)
        db.session.commit()

        response_dict = {
            "message" : "record succefully deleted"
        }
        return response_dict, 200

@ns.route('/transaction')
class PostTransaction(Resource):
    def post(self):
        try:
            # Validate and get data from the request
            

            # if not (photo_id and user_id and quantity and amount):
            #     return {"message": "Missing required fields"}, 400

            # Create a new transaction
            new_transaction = Transaction(
                photo_id = request.form.get ('photo_id') ,
                user_id = request.form.get ('user_id') ,
                cart_item_id = request.form.get ('user_id') ,          
            )

            # Add the new transaction to the database
            db.session.add(new_transaction)
            db.session.commit()

            # Return a response as a JSON object
            return {
                "message": "Transaction created successfully",
                "transaction": {
                    "photo_id": new_transaction.photo_id,
                    "user_id": new_transaction.user_id,
                    'cart_item_id':new_transaction.cart_item_id,
                }
            }, 201
        except Exception as e:
            db.session.rollback()
            return{
                "message": "Failed to create transaction",
                "error": str(e)
            }, 500   
            
@ns.route('/transaction/<int:id>')
class UpdateTransaction(Resource):
    def patch(self, id):

        record = Transaction.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(record, attr, request.form[attr])

        db.session.add(record)
        db.session.commit()
        mydict = {
            "photo_id" :record.photo_id ,
            "user_id" : record.user_id ,
        }
        
        return mydict,200

@ns.route('/photos')
class Photos(Resource):
    @ns.marshal_list_with(photo_schema)
    def get(self):
        try:
            photos = Photo.query.all()
            if not photos:
                return "No photos found", 404
            return photos, 200
        except Exception as e:
            app.logger.error(str(e))
            return "Error loading photos", 500


@ns.route('/userphotos/')
class Photos(Resource):
    @jwt_required()
    @ns.marshal_with(photo_schema)
    def get(self):
        try:
            current_user = get_jwt_identity()
            photos = Photo.query.filter_by(user_id = current_user).all()
            if not photos:
                return "No photos found", 404
            else:
                return photos, 200
        except Exception as e:
            app.logger.error(str(e))
            return "Error loading photos", 500


@ns.route('/addphotos')
class Photos(Resource):
    @ns.expect(photo_input_schema)  
    @ns.marshal_with(photo_schema)  
    def post(self):
        try:
            data = request.get_json()
            # print(data)
            user = User.query.filter_by(username=data['postedBy']).first()
            category = Category.query.filter_by(name=data['category']).first()
            print(f'user: {user}')
            print(f'category: {category.id}')
            print(f'image: {data["imageUrl"]}')
            print(f'user_id: {user.id}')
            print(f'price: {data["price"]}')

            new_photo = Photo(
                name=data['name'],
                description=data['description'],
                price=data['price'],
                image=data['imageUrl'],
                user_id=user.id, 
                category_id=category.id,  
            )
            print(f'new_photo: {new_photo}')
            db.session.add(new_photo)
            db.session.commit()
            print(f'new_photo: {new_photo}')

            return new_photo, 201 
        except Exception as e:
            return {'message': 'Failed to create photo', 'error': str(e)}, 400  



@ns.route('/cart/add/<int:photo_id>')
class AddToCart(Resource):
    @ns.expect(cart_item_input_schema, validate=True)
    def post(self, photo_id):
        data = request.get_json()

        # Extract user_id from the request data
        user_id = data.get('user_id')
        print(f"Received request to add photo {photo_id} to cart for user {user_id}")

        if not user_id:
            return make_response('Unauthorized: User ID missing in request data', 401)

        try:
            user = User.query.get(user_id)
            if not user:
                return make_response('Unauthorized: User not found', 401)

            user_cart = Cart.query.filter_by(user_id=user_id).first()
            if user_cart is None:
                new_cart = Cart(user_id=user_id)
                db.session.add(new_cart)
                db.session.commit()
                user_cart = new_cart

            photo = Photo.query.get(photo_id)
            if not photo:
                app.logger.error("Photo not found")
                return {"message": "Photo not found"}, 404

            if user_cart:
                existing_item = CartItem.query.filter_by(cart_id=user_cart.id, photo_id=photo_id).first()
                if existing_item:
                    app.logger.error("Item is already in the cart")
                    return {"message": "Item is already in the cart"}, 400

            # Add the item to the cart
            new_item = CartItem(cart=user_cart, photo=photo, quantity=data["quantity"])
            db.session.add(new_item)

            try:
                db.session.commit()
                app.logger.info("Item added to the cart successfully")
            except Exception as e:
                db.session.rollback()
                app.logger.error(f"Error adding item to cart: {str(e)}")
                return {"message": "Internal server error"}, 500
        except Exception as e:
            app.logger.error(f"Error processing the request: {str(e)}")
            return {"message": "Internal server error"}, 500


@ns.route('/checkout')
class Checkout(Resource):
    # @token_required
    @ns.expect(transaction_input_schema)
    def post(self):
        data = request.get_json()


        # Check if the user has a cart
        user_cart = Cart.query.filter_by(user_id=data['user_id']).first()
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
                user_id=data['user_id'], 
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

@ns.route('/cart/items/<int:user_id>')
class CartItemsResource(Resource):
    def get(self, user_id):
        try:
            user_cart = Cart.query.filter_by(user_id=user_id).first()
            if not user_cart:
                return {"message": "Cart not found for this user"}, 404

            cart_items = CartItem.query.filter_by(cart_id=user_cart.id).all()
            serialized_cart_items = [api.marshal(item, cart_item_output_schema) for item in cart_items]

            return api.marshal({"cart_items": serialized_cart_items}, cart_items_schema), 200
        except Exception as e:
            app.logger.error(f"Error retrieving cart items: {str(e)}")
            return {"message": "Internal server error"}, 500