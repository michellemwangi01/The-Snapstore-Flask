from app_factory import fields, api

# ------------------------- A P I _ M O D E L S ------------------------

user_schema = api.model ('users',{
    "id": fields.Integer,
    "username": fields.String,
    "password": fields.String,
    "email": fields.String
})
user_input_schema = ('user input',{
    "id": fields.Integer,
    "username": fields.String,
    "password": fields.String,
    "email": fields.String
})