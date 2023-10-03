from app_factory import fields, api

# ------------------------- A P I _ M O D E L S ------------------------

user_schema = api.model('user',{
    "id": fields.Integer,
    "username": fields.String,
    "password": fields.String,
    "email": fields.String
})
user_input_schema = api.model('user_input',{
    "username": fields.String,
    "password": fields.String,
    "email": fields.String,

})

