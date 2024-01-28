from flask import session, request
from flask_restful import Resource
from config import api, db

from models.user import User

class Logout(Resource):
  def delete(self):
    user = User.query.filter_by(id = session.get('user_id')).first()
    if user:
      session['user_id'] = None
      return {}, 200
    else:
      return {"errors": "Error: cannot log out, you are not logged in"}, 401
        