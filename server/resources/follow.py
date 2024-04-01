from flask_restful import Resource
from flask import request
from config import db,api

from models.follow import Follow
from models.raceEvent import RaceEvent

class FollowResource(Resource):
  def post(self):
    json = request.get_json()
    user_id = json.get('user_id')
    race_event_id = json.get('race_event_id')

    if not user_id or not race_event_id:
      return {'message': 'User ID or Race Event ID not provided'}, 400
    
    follow = Follow.query.filter_by(user_id=json['user_id'], race_event_id=json['race_event_id']).first()

    if follow:
      db.session.delete(follow)
      db.session.commit()

      return {}, 204
    else:
      new_follow = Follow(user_id=json['user_id'], race_event_id=json['race_event_id'])
      db.session.add(new_follow)
      db.session.commit()
      return new_follow.to_dict(), 201
    

  def delete(self):
    json = request.get_json()
    user_id = json.get('user_id')
    race_event_id = json.get('race_event_id')
    
    if not user_id or not race_event_id:
      return {'message': 'User ID or Race Event ID not provided'}, 400
    
    follow = Follow.query.filter_by(user_id=user_id, race_event_id=race_event_id).first()

    if follow:
      db.session.delete(follow)
      db.session.commit()
      return {}, 204
    else:
      return {'message': 'Follow not found'}, 404

api.add_resource(FollowResource, '/api/follows')

class FollowedEventsResource(Resource):
  def get(self, user_id):
    followed_events = Follow.query.filter_by(user_id=user_id).all()
    if not followed_events:
      return {'message': 'No followed events found for the user'}, 404
    
    followed_event_ids = [follow.race_event_id for follow in followed_events]
    events = RaceEvent.query.filter(RaceEvent.id.in_(followed_event_ids)).all()

    return {'followedEvents': [event.to_dict() for event in events]}, 200

api.add_resource(FollowedEventsResource, '/api/user/<int:user_id>/followed-events')
