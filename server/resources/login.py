from flask import session, request
from flask_restful import Resource
from config import api, db

from models.user import User

class Login(Resource):
  def post(self):
    username = request.get_json()['username']
    password = request.get_json()['password']

    user = User.query.filter_by(username=username).first()

    if user and user.authenticate(password):
        session['user_id'] = user.id
        response_body = user.to_dict(rules=('-_password_hash',))
        return response_body, 200
    else:
        return {"errors": ["Invalid username and/or password"]}, 401
  
  def get(self):
    return ({"message": "hi"}, 200)