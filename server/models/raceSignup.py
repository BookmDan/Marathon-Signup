from config import db
from sqlalchemy_serializer import SerializerMixin

class RaceSignup(db.Model, SerializerMixin):
  __tablename__ = "race_signup"
  
  id = db.Column(db.Integer, primary_key=True)
  waiver_accept = db.Column(db.Boolean)
  tshirt_size = db.Column(db.String)
  coupon_code = db.Column(db.String)

  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True)
  user = db.relationship('User', back_populates='race_signup')
  race_event_id = db.Column(db.Integer, db.ForeignKey('race_event.id'))
  race_event = db.relationship('RaceEvent', back_populates='race_signups')

  def __repr__(self):
    return f'<RaceSignup id={self.id} user_id={self.user_id} raceEvent_id={self.raceEvent_id}>'