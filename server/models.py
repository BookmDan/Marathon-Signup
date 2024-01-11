# from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime
# from sqlalchemy import MetaData
from config import db 
from sqlalchemy_serializer import SerializerMixin

# metadata = MetaData(naming_convention={
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
# })
# # from app import db

# # create the Flask SQLAlchemy extension
# db = SQLAlchemy()

class Pet(db.Model, SerializerMixin):
  __tablename__ = 'pets'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)

  def __repr__(self) -> str:
     return f'<User {self.id}, {self.name}>'

# class User(db.Model, SerializerMixin):
#   __tablename__ = 'users'

#   id = db.Column(db.Integer, primary_key=True)
#   username = db.Column(db.String, unique=True, nullable=False)
#   email = db.Column(db.String, unique=True, nullable=False)
#   password = db.Column(db.String, nullable=False)
#   address_line1 = db.Column(db.String)
#   address_line2 = db.Column(db.String)
#   city = db.Column(db.String)
#   state = db.Column(db.String)
#   postal_code = db.Column(db.String)

#   def __repr__(self):
#       return f'<User {self.id}, {self.username}, {self.email}>'

# class Pom(db.Model):
#     __tablename__ = 'poms'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String, nullable=False)
#     age = db.Column(db.Integer)
#     color = db.Column(db.String)
#     description = db.Column(db.String)

#     # Relationship with AdoptionRequest model
#     adoption_requests = db.relationship('AdoptionRequest', backref=db.backref('pom', lazy=True), cascade='all, delete-orphan')

#     def __repr__(self):
#         return f'<Pom {self.id}, Name: {self.name}, Age: {self.age}, Color: {self.color}>'

# class AdoptionRequest(db.Model):
#   __tablename__ = 'adoption_requests'

#   id = db.Column(db.Integer, primary_key=True)
#   user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#   pom_id = db.Column(db.Integer, db.ForeignKey('poms.id'), nullable=False)
#   adopter_name = db.Column(db.String, nullable=False)
#   email = db.Column(db.String, nullable=False)

#   # status = db.Column(db.String)  # Uncomment if needed
#   # created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)  # Uncomment if needed

#   # Relationship with User model
#   user = db.relationship('User', backref=db.backref('adoption_requests', lazy=True))

#   # Relationship with Pom model
#   pom = db.relationship('Pom', backref=db.backref('adoption_requests_rel', lazy=True, cascade='all, delete-orphan'))

#   def __repr__(self):
#       return f'<AdoptionRequest {self.id}, Adopter: {self.adopter_name}, User: {self.user.username}, Pom: {self.pom.name}>'

# # PomAd model
# class PomAd(db.Model):
#   __tablename__ = 'pomads'

#   id = db.Column(db.Integer, primary_key=True)
#   user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#   pom_id = db.Column(db.Integer, db.ForeignKey('poms.id'), nullable=False)
#   title = db.Column(db.String, nullable=False)
#   description = db.Column(db.Text)
#   created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

#   # Foreign key to link with User model (assuming each PomAd is associated with a user)
#   user = db.relationship('User', backref=db.backref('pomads', lazy=True))
#   pom = db.relationship('Pom', backref=db.backref('pomads', lazy=True))
  
#   def __repr__(self):
#       return f'<PomAd {self.id}, {self.title}, {self.user.username}>'