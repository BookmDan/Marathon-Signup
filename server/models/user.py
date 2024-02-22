from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import Schema, fields
from sqlalchemy.orm import validates

# from dotenv import load_dotenv

from config import db, bcrypt

class User(db.Model, SerializerMixin):
  __tablename__ = "users"
  id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String, nullable=False)
  last_name = db.Column(db.String, nullable=False)
  email = db.Column(db.String, unique=True, nullable=False)
  phone_number = db.Column(db.String)
  _password_hash = db.Column(db.String)
  admin = db.Column(db.Boolean, default=False)
  estimated_finish_time = db.Column(db.Integer)

  results = db.relationship("Results", back_populates="user")
  
  @property
  def password_hash(self):
    return self._password_hash
    # raise Exception("You cannot view the password hash.")

  @password_hash.setter
  def password_hash(self, password):
    if len(password) < 8:
      raise ValueError("Passwords must be 8 or more characters")
    self._password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))

  def check_password(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
  
  race_signups = db.relationship('RaceSignup', back_populates='user', uselist=False)
  credit_card_info = db.relationship('CreditCardInfo', back_populates='user') 
  race_events = db.relationship("RaceEvent", secondary="race_signup", back_populates="users")

  serialize_rules = ('-_password_hash', '-race_signups.user', '-race_signups.race_event','-credit_card_info.user', '-race_events',)
  # only for front end 

  @validates("email")
  def check_email(self, key, email):
    if '@' not in email:
      raise ValueError("Invalid email format.Email must contain '@' symbol.")
    return email

  def __repr__(self):
    return f'<User id={self.id} first_name={self.first_name} last_name={self.last_name} email={self.email}>'
  
class UserSchema(Schema):
  id = fields.Int()
  first_name = fields.Str(required=True)
  last_name = fields.Str(required=True)
  email = fields.Email(required=True)
  phone_number = fields.Str()
  password = db.Column(db.String)
  estimated_finish_time_hours = fields.Int(attribute='estimated_finish_time_hours')
  estimated_finish_time_minutes = fields.Int(attribute='estimated_finish_time_minutes')
  estimated_finish_time_seconds = fields.Int(attribute='estimated_finish_time_seconds')
# user_schema = UserSchema()