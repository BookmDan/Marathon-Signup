from config import db
from sqlalchemy_serializer import SerializerMixin
from marshmallow import Schema, fields

class User(db.Model, SerializerMixin):
  __tablename__ = "user"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  # first_name = db.Column(db.String, nullable=False)
  # last_name = db.Column(db.String, nullable=False)
  email = db.Column(db.String, unique=True, nullable=False)
  phone_number = db.Column(db.String)
  password = db.Column(db.String)
  
  race_signups = db.relationship('RaceSignup', back_populates='user', uselist=False)
  credit_card_info = db.relationship('CreditCardInfo', back_populates='user') 
  race_events = db.relationship('RaceEvent', back_populates='user') 

  def __repr__(self):
    return f'<User id={self.id} name={self.name} email={self.email}>'
  
class UserSchema(Schema):
  id = fields.Int()
  first_name = fields.Str(required=True)
  last_name = fields.Str(required=True)
  email = fields.Email(required=True)
  phone_number = fields.Str()
  password = fields.Str(load_only=True)
  
# user_schema = UserSchema()