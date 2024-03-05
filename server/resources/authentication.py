from flask import abort, session, request, make_response
from flask_restful import Resource
from config import db

from models.user import User

class Login(Resource):
  def post(self):
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    # import ipdb; ipdb.set_trace()

    if user.check_password(password):
      session['user_id'] = user.id
      resp = make_response(user.to_dict(), 200)
      return resp
    else:
      return {"errors": ["Invalid username and/or password"]}, 401

class Logout(Resource):
  def delete(self): # just add this line!
    session['user_id'] = None
    return {'message': '204: No Content'}, 204

class Signup(Resource):
  def post(self):
    json = request.get_json()

    try:
      user = User(
        first_name=json.get('first_name'),
        last_name=json.get('last_name'),
        email=json.get('email'),
        phone_number=json.get('phone_number'),
      ) 
      #hashes password and saves it to _password_hash
      user.password_hash = json['password']
      db.session.add(user)
      db.session.commit()
      session['user_id'] = user.id

      return user.to_dict(), 201
    except Exception as err:
      return {"errors": [str(err)]}, 422