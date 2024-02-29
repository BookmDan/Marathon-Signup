from config import db
from sqlalchemy_serializer import SerializerMixin
from marshmallow import Schema, fields
from sqlalchemy import text
  
class RaceEvent(db.Model, SerializerMixin):
  __tablename__ = 'race_events'
  id = db.Column(db.Integer, primary_key=True)
  race_name = db.Column(db.String, nullable=False)
  organization = db.Column(db.String) # who is hosting
  race_type = db.Column(db.String)  
  start_time = db.Column(db.String)  
  start_day = db.Column(db.String)  
  packetpickup_day = db.Column(db.String) 
  packetpickup_location = db.Column(db.String)  
  location = db.Column(db.String)  
  race_cost = db.Column(db.Float, nullable=False) 

  race_signups = db.relationship('RaceSignup', back_populates='race_event')
  users = db.relationship("User", secondary="race_signups", back_populates="race_events")
  serialize_rules = ('-users','-race_signups',)
  
  def __repr__(self):
    return f'<RaceEvent id={self.id}  organization={self.organization} race_type={self.race_type}race_cost={self.race_cost}>'
  
class RaceEventSchema(Schema):
  id = fields.Int(dump_only=True)
  race_name = fields.Str(required=True)
  organization = fields.Str()
  race_type = fields.Str()
  start_time = fields.Str()  
  start_day = fields.Str()  
  packetpickup_day = fields.Str()  
  packetpickup_location = fields.Str()
  location = fields.Str()  
  race_cost = fields.Float(required=True)
