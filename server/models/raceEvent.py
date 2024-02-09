from config import db
from sqlalchemy_serializer import SerializerMixin
from marshmallow import Schema, fields
from sqlalchemy import text
  
class RaceEvent(db.Model, SerializerMixin):
  __tablename__ = 'race_event'

  id = db.Column(db.Integer, primary_key=True)
  race_name = db.Column(db.String, nullable=False)
  organization = db.Column(db.String) # who is hosting
  race_type = db.Column(db.String)  

  race_signups = db.relationship('RaceSignup', back_populates='race_event')

  def __repr__(self):
    return f'<RaceEvent id={self.id}  organization={self.organization} race_type={self.race_type}>'
  
class RaceEventSchema(Schema):
  id = fields.Int(dump_only=True)
  race_name = fields.Str(required=True)
  organization = fields.Str()
  race_type = fields.Str()

