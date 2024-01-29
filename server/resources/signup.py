from flask import request, session
from flask_restful import Resource
from config import db, api

# Add your model imports
from models.user import User

class Signup(Resource):
  def post(self):
    json = request.get_json()

    try:
      user = User(
        first_name=json.get('first_name'),
        last_name=json.get('last_name'),
        email=json.get('email'),
        phone_number=json.get('phone_number'),
        # password=json.get('password')
      ) 
      #hashes password and saves it to _password_hash
      user.password_hash = json['password']
      db.session.add(user)
      db.session.commit()

      session['user_id'] = user.id
      # import ipdb; ipdb.set_trace()

      return user.to_dict(), 201
    
    except Exception as err:
      return {"errors": [str(err)]}, 422
    
# api.add_resource(Signup, '/signup')