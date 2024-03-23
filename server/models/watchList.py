from sqlalchemy_serializer import SerializerMixin
from config import db

class Following(db.Model, SerializerMixin):
    __tablename__ = 'following'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    race_event_id = db.Column(db.Integer, db.ForeignKey('race_events.id'))

    user = db.relationship('User', back_populates='follows')
    race_event  = db.relationship('RaceEvent', back_populates='followers')

    serialize_only = ('id', 'user_id', 'race_event_id')

    def __repr__(self):
        return f'Following {self.id}'