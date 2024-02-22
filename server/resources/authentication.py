from flask import abort, session, request, jsonify 
from flask_restful import Resource
from config import api, db

from models.user import User

class Login(Resource):
  def post(self):
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
      session['user_id'] = user.id
      response_body = user.to_dict(rules=('-_password_hash',))
      return response_body, 200
    else:
      return {"errors": ["Invalid username and/or password"]}, 401

class Logout(Resource):
  def delete(self): # just add this line!
    session['user_id'] = None
    return {'message': '204: No Content'}, 204

    # user = User.query.filter_by(id = session.get('user_id')).first()

    # if user:
    #   session['user_id'] = None
    #   return {}, 200
    # else:
    #   return {"errors": "Error: cannot log out, you are not logged in"}, 401

  # def post(self):
  #   session.pop('user_id', None)
  #   return jsonify({'message': 'Logout successful'}, 200)
  # def delete(self):

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
    
    # jsonify({'message': 'Signup successful', 'user': user.to_dict()}, 201)
    
    except Exception as err:
      return {"errors": [str(err)]}, 422
    
# api.add_resource(Signup, '/signup')