from flask import request, session
from flask_restful import Resource
from config import db

# Add your model imports
from models.user import User

class Signup(Resource):
  def post(self):
    json = request.get_json()

    try:
      user = User(username=json.get('username'), address=json.get('address'))
      user.password_hash = json.get('password')
      db.session.add(user)
      db.session.commit()

      session['user_id'] = user.id

      return user.to_dict(), 201
    
    except Exception as err:
      return {"errors": [str(err)]}, 422