from flask import abort, session, request, make_response
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


class Logout(Resource):
  def post(self):
    session.pop('user_id', None)
    return make_response({'message': 'Logout successful'}, 200)
  # def delete(self):
  #   user = User.query.filter_by(id = session.get('user_id')).first()
  #   if user:
  #     del session['user_id']
  #     return {'message': 'Logout successful'}, 200
  #     # session['user_id'] = None
  #     # return {}, 200
  #   else:
  #     return {"error": "You are already logged out"}, 401

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

      return make_response({'message': 'Signup successful', 'user': user.to_dict()}, 201)
    
    except Exception as err:
      return {"errors": [str(err)]}, 422
    
# api.add_resource(Signup, '/signup')