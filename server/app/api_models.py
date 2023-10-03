from app_factory import fields, api

# ------------------------- A P I _ M O D E L S ------------------------

user_schema = api.model('user',{
    "id": fields.Integer,
    "public_id": fields.String,
    "username": fields.String,
    "password": fields.String,
    "email": fields.String,
    "profile_pic": fields.String
})
user_input_schema = api.model('user_input',{
    "username": fields.String,
    "password": fields.String,
    "email": fields.String,
    # "profile_pic": fields.Nested()
})

