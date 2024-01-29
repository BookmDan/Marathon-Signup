from flask import abort, session, request
from flask_restful import Resource
from config import api, db

from models.user import User

class Login(Resource):
  def post(self):
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # try:
    user = User.query.filter_by(email=email).first()

    if user:
      if user.authenticate(password):
          #session set at login and signup
        session['user_id'] = user.id
        return user.to_dict(),200
      else:
        print("password login attempt failed.")
    else:
      return {"errors": "Username or Password didn't match."}, 422
      
  # def get(self):
  #   return ({"message": "hi"}, 200)