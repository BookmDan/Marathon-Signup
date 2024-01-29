from flask import abort, session, request
from flask_restful import Resource
from config import api, db

from models.user import User

class Login(Resource):
  def post(self):
    data = request.get_json()
    username = data.get("email")
    password = data.get("password")

    try:
      user = User.query.filter_by(email=username).first()

      if user and user.authenticate(password):
          #session set at login and signup
          session['user_id'] = user.id
          response_body = user.to_dict(rules=('-_password_hash',))
          return response_body, 200
    except:
      abort(422, "Username or Password didn't match.")
      
  # def get(self):
  #   return ({"message": "hi"}, 200)