from flask import abort, session, request
from flask_restful import Resource
from config import api, db

from models.user import User

class Login(Resource):
  def post(self):
    username = request.get_json()['email']
    password = request.get_json()['password']

    try:
      user = User.query.filter_by(email=username).first()

      if user and user.authenticate(password):
          #session set at login and signup
          session['user_id'] = user.id
          response_body = user.to_dict(rules=('-_password_hash',))
          return response_body, 200
    except:
      abort(401, "Invalid username and/or password")
      
  # def get(self):
  #   return ({"message": "hi"}, 200)