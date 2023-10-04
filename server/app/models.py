from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData, UniqueConstraint, ForeignKey
from flask_sqlalchemy import SQLAlchemy
import bcrypt
from .app_factory import generate_password_hash

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String)
    username = db.Column(db.String)
    email = db.Column(db.String)
    password_hash = db.Column(db.String)
    profile_pic = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    photos = db.relationship('Photo', back_populates='user', cascade='all, delete-orphan')
    transactions = db.relationship('Transaction', back_populates='user')

    __table_args__ = (UniqueConstraint('username', name='user_unique_constraint'),)

    def __repr__(self):
        return f'(id={self.id}, name={self.username} email={self.email} profile_pic={self.profile_pic})'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password, method='pbkdf2:sha256', salt_length=16)

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))


class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    price = db.Column(db.Numeric(precision=10, scale=2))
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    category_id = db.Column(db.Integer, ForeignKey('categories.id'))
    image = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    __table_args__ = (UniqueConstraint('name', name='img_name_unique_constraint'),)

    category = db.relationship('Category', back_populates='photos')
    user = db.relationship('User', back_populates='photos')
    transaction = db.relationship('Transaction', back_populates='photo')

    def __repr__(self):
        return f'(id={self.id}, name={self.name} description={self.description} price={self.price} price={self.image} user_id={self.user_id} category_id={self.category_id} )'


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    __table_args__ = (UniqueConstraint('name', name='category_name_unique_constraint'),)

    photos = db.relationship('Photo', back_populates='category', cascade='all, delete-orphan')

    def __repr__(self):
        return f'(id={self.id}, name={self.name})'


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    photo_id = db.Column(db.Integer, ForeignKey('photos.id'))
    quantity = db.Column(db.Integer)
    amount = db.Column(db.Integer)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship('User', back_populates='transactions')
    photo = db.relationship('Photo', back_populates='transactions')

    def __repr__(self):
        return f'(id={self.id}, quantity={self.quantity} amount={self.amount})'
