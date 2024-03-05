from flask import session
from flask_restful import Resource
from config import api, db


# Add your model imports
from models.user import User

class AuthorizedSession(Resource):
  def get(self):
    user = User.query.filter_by(id = session.get('user_id')).first()
    # import ipdb; ipdb.set_trace()
    if user:
      response_body = user.to_dict()
      return response_body, 200
    else:
      return {"errors": "User not logged in"}, 401
    