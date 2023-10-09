from api import fields, api

# ------------------------- A P I _ M O D E L S ------------------------

users_schema = api.model('user',{
    "public_id": fields.String,
    "username": fields.String,
    "email": fields.String,
    "profile_pic": fields.String
})

user_input_schema = api.model('user_input',{
    "username": fields.String,
    "password": fields.String,
    "repeatpassword": fields.String,
    "email": fields.String,
})
user_login_schema = api.model('user_login',{
    "username": fields.String,
    "password": fields.String,

})

category_input_schema = api.model('category_input',{
    "name": fields.String,
})


photo_category_schema = api.model('photo',{
    "id": fields.Integer,
    "name": fields.String,
    "description": fields.String,
    "price": fields.Integer,
    "image": fields.String,
})

transaction_schema = api.model('transaction', {
    "id": fields.Integer,
    "photo": fields.Nested(photo_category_schema),
    "user": fields.Nested(users_schema),
    "purchased_at": fields.DateTime,
})

user_schema = api.model('user',{
    "id": fields.Integer,
    "public_id": fields.String,
    "username": fields.String,
    "email": fields.String,
    "photos": fields.List(fields.Nested(photo_category_schema)),
    "transactions": fields.List(fields.Nested(transaction_schema)),
})

category_schema = api.model('category',{
    "id": fields.Integer,
    "name": fields.String,
    "photos": fields.List(fields.Nested(photo_category_schema))
})
categories_schema = api.model('category',{
    "id": fields.Integer,
    "name": fields.String,
})
photo_schema = api.model('photo',{
    "id": fields.Integer,
    "name": fields.String,
    "description": fields.String,
    "price": fields.Integer,
    "image": fields.String,
    "user": fields.Nested(users_schema),
    "category": fields.Nested(categories_schema)
})

photo_input_schema = api.model('photo_input',{
    "name": fields.String,
    "description": fields.String,
    "price": fields.Integer,
    "image": fields.String,
    "user_id": fields.Integer,
    "category_id": fields.Integer
})
cart_item_input_schema = api.model('cart_item_input', {
    "photo_id": fields.Integer(required=True),
    "quantity": fields.Integer(required=True),
})

transaction_input_schema = api.model('transaction_input', {
    "photo_id": fields.Integer(required=True),
    "quantity": fields.Integer(required=True),
})

cart_item_schema = api.model('cart_item', {
    "id": fields.Integer,
    "cart_id": fields.Integer,
    "photo_id": fields.Integer,
    "quantity": fields.Integer,
    "added_at": fields.DateTime,
})
transaction_input_schema = api.model('transaction_input', {
    "id": fields.Integer,
})

cart_item_output_schema = api.model('cart_item_output', {
    "id": fields.Integer,
    "cart_id": fields.Integer,
    "photo_id": fields.Integer,
    "quantity": fields.Integer,
    "added_at": fields.DateTime,
    "photo": fields.Nested(photo_schema), 
})

cart_items_schema = api.model('cart_items', {
    "cart_items": fields.List(fields.Nested(cart_item_output_schema)),
})






