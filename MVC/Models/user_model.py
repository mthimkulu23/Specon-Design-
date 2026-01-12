from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    full_name = db.Column(db.String(120), nullable=False)
    user_type = db.Column(db.String(20), nullable=False)  # 'doctor' or 'patient'
    contact = db.Column(db.String(20), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    def __init__(self, username, email, full_name, user_type, contact, password):
        self.username = username
        self.email = email
        self.full_name = full_name
        self.user_type = user_type
        self.contact = contact
        self.set_password(password)

    def set_password(self, password):
        """Hash and set the password"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Verify the password"""
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        """Convert user object to dictionary"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'full_name': self.full_name,
            'user_type': self.user_type,
            'contact': self.contact
        }



