from config import db
from sqlalchemy_serializer import SerializerMixin
  
class RaceEvent(db.Model, SerializerMixin):
  __tablename__ = 'race_event'

  id = db.Column(db.Integer, primary_key=True)
  # race_name = db.Column(db.String, nullable=False)
  organization = db.Column(db.String) # who is hosting
  race_type = db.Column(db.String)  # e.g., '5k', '10k', 'half', 'full'

  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
  user = db.relationship('User', back_populates='race_events')
  
  race_signups = db.relationship('RaceSignup', back_populates='race_event')

  def __repr__(self):
    return f'<RaceEvent id={self.id}   organization={self.organization} raceType={self.raceType}>'
  
  # race_name={self.race_name}