from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData, UniqueConstraint
from flask_sqlalchemy import SQLAlchemy
import bcrypt

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)



class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    password_hash = db.Column(db.String)
    profile_pic = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    __table_args__ = (UniqueConstraint('username', name='user_unique_constraint'),)

    # heropowers = db.relationship('HeroPower', back_populates='hero', cascade='all, delete-orphan')
    # powers = association_proxy('heropowers', 'power')

    def __repr__(self):
        return f'(id={self.id}, name={self.username} email={self.email} profile_pic={self.profile_pic})'

    def set_password(self, password):
        # Generate a password hash
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.password_hash = password_hash.decode('utf-8')

    def check_password(self, password):
        # Check if a provided password matches the stored hash
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

