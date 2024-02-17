from config import db
from sqlalchemy_serializer import SerializerMixin
from marshmallow import Schema, fields

class Results(db.Model, SerializerMixin):
  __tablename__ = "results"
  id = db.Column(db.Integer, primary_key=True)
  race_place = db.Column(db.Integer)
  bib_number = db.Column(db.Integer)
  full_name = db.Column(db.String)
  gender = db.Column(db.String)
  age = db.Column(db.Integer)
  city = db.Column(db.String)
  state = db.Column(db.String)
  run_time = db.Column(db.String)
  gender_place = db.Column(db.Integer)
  age_group = db.Column(db.String)
  age_place = db.Column(db.Integer)
  overall_pace = db.Column(db.String)

  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True)
  user = db.relationship('User', back_populates='results')
  race_event_id = db.Column(db.Integer, db.ForeignKey('race_event.id'))
  race_event = db.relationship('RaceEvent', back_populates='results')

  def __repr__(self):
    return f'<RaceSignup id={self.id} race_place={self.race_place} bib_number={self.bib_number}>'

class ResultsSchema(Schema):
    race_place = fields.Int()
    bib_number = fields.Int()
    full_name = fields.Str()
    gender = fields.Str()
    age = fields.Int()
    city = fields.Str()
    state = fields.Str()
    run_time = fields.Str()
    gender_place = fields.Int()
    age_group = fields.Str()
    age_place = fields.Int()
    overall_pace = fields.Str()
