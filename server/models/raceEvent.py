from config import db
from sqlalchemy_serializer import SerializerMixin
from marshmallow import Schema, fields
  
class RaceEvent(db.Model, SerializerMixin):
  __tablename__ = 'race_event'

  id = db.Column(db.Integer, primary_key=True)
  race_name = db.Column(db.String, nullable=False)
  organization = db.Column(db.String) # who is hosting
  race_type = db.Column(db.String)  
  price_5k = db.Column(db.Float)  
  price_10k = db.Column(db.Float) 
  price_half = db.Column(db.Float)  
  price_full = db.Column(db.Float)
  
  race_signups = db.relationship('RaceSignup', back_populates='race_event')
  
#   race_name={self.race_name}
  def __repr__(self):
    return f'<RaceEvent id={self.id}  organization={self.organization} race_type={self.race_type}>'
  
class RaceEventSchema(Schema):
  id = fields.Int(dump_only=True)
  race_name = fields.Str(required=True)
  organization = fields.Str()
  race_type = fields.Str()
  price_5k = fields.Float()
  price_10k = fields.Float()
  price_half = fields.Float()
  price_full = fields.Float()

# schema_instance = RaceEventSchema()
