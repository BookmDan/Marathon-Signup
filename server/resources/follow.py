from flask_restful import Resource
from flask import request
from config import db,api

from models.follow import Follow

class FollowResource(Resource):
  def post(self):
    json = request.get_json()

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
    
api.add_resource(FollowResource, '/api/follows')

