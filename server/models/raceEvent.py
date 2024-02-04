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
  
  race_types = db.relationship('RaceType', back_populates='race_event')
  race_signups = db.relationship('RaceSignup', back_populates='race_event')

  def __repr__(self):
    return f'<RaceEvent id={self.id}  organization={self.organization} race_type={self.race_type}>'
  
class RaceType(db.Model, SerializerMixin):
    __tablename__ = 'race_type'

    id = db.Column(db.Integer, primary_key=True, server_default=text("nextval('race_type_id_seq'::regclass)"))
    race_type = db.Column(db.String)  # e.g., '5k', '10k', 'half', 'full'
    price = db.Column(db.Float)  # Price for this race type

    # Establish a many-to-one relationship with RaceEvent
    race_event_id = db.Column(db.Integer, db.ForeignKey('race_event.id'), nullable=False)
    race_event = db.relationship('RaceEvent', back_populates='race_types')

    def __repr__(self):
        return f'<RaceType id={self.id} race_type={self.race_type} price={self.price}>'
    
class RaceEventSchema(Schema):
  id = fields.Int(dump_only=True)
  race_name = fields.Str(required=True)
  organization = fields.Str()
  race_types = fields.Nested('RaceTypeSchema', many=True)  # Nested serialization for RaceType

class RaceTypeSchema(Schema):
  id = fields.Int(dump_only=True)
  race_type = fields.Str()
  price = fields.Float()

