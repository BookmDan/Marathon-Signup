from config import db
from sqlalchemy_serializer import SerializerMixin
from marshmallow import Schema, fields

class RaceSignup(db.Model, SerializerMixin):
  __tablename__ = "race_signups"
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  race_event_id = db.Column(db.Integer, db.ForeignKey('race_events.id'), nullable=False)
  waiver_accept = db.Column(db.Boolean, nullable = False)
  tshirt_size = db.Column(db.String, nullable = False)
  coupon_code = db.Column(db.String, nullable = True)
  ship_packet = db.Column(db.Boolean, nullable = True, default = False)

  user = db.relationship('User', back_populates='race_signups')
  race_event = db.relationship('RaceEvent', back_populates='race_signups', overlaps="race_signups" )


  def __repr__(self):
    return f'<RaceSignup id={self.id} user_id={self.user_id} raceEvent_id={self.raceEvent_id}>'

class RaceSignupSchema(Schema):
  id = fields.Int(dump_only=True)
  waiver_accept = fields.Boolean()
  tshirt_size = fields.Str()
  coupon_code = fields.Str()
  ship_packet = fields.Boolean() 

race_signup_schema = RaceSignupSchema()