from config import db
from sqlalchemy_serializer import SerializerMixin
from marshmallow import Schema, fields

class RaceSignup(db.Model, SerializerMixin):
  __tablename__ = "race_signup"
  id = db.Column(db.Integer, primary_key=True)
  waiver_accept = db.Column(db.Boolean)
  tshirt_size = db.Column(db.String)
  coupon_code = db.Column(db.String)
  ship_packet = db.Column(db.Boolean)

  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True)
  user = db.relationship('User', back_populates='race_signups')
  race_event_id = db.Column(db.Integer, db.ForeignKey('race_event.id'))
  race_event = db.relationship('RaceEvent', back_populates='race_signups')


  def __repr__(self):
    return f'<RaceSignup id={self.id} user_id={self.user_id} raceEvent_id={self.raceEvent_id}>'

class RaceSignupSchema(Schema):
    id = fields.Int(dump_only=True)
    waiver_accept = fields.Boolean()
    tshirt_size = fields.Str()
    coupon_code = fields.Str()
    ship_packet = fields.Boolean() 

# race_signup_schema = RaceSignupSchema()