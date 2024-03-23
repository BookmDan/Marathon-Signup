from sqlalchemy_serializer import SerializerMixin
from config import db

class Follow(db.Model, SerializerMixin):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    race_event_id = db.Column(db.Integer, db.ForeignKey('race_events.id'))

    user = db.relationship('User', back_populates='follows')
    race_event  = db.relationship('RaceEvent', back_populates='follows')

    serialize_only = ('id', 'user_id', 'race_event_id')

    def __repr__(self):
        return f'Follow {self.id}'