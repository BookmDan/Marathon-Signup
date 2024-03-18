from config import api, db
from flask import jsonify, request, session
from flask_restful import Resource
from models.models import User, UserSchema

user_schema = UserSchema()

class UserResource(Resource):
  def get(self):
    users = User.query.all()
    schema = UserSchema(many=True)
    resp = schema.dump(users)
    return jsonify(resp, 200)
  
api.add_resource(UserResource, '/api/users')

class UserById(Resource):
  def get(self, id):
    user = User.query.get(id)

    if user:
      resp = user_schema.dump(user)
      status_code = 200
    else:
      resp = {"message": f"User with ID {id} was not found."}
      status_code = 404

    return jsonify(resp), status_code
  
  def patch(self, id):
    user = User.query.filter_by(id=id).first()
    if user:
      form_data = request.get_json()
      for attr in form_data:
          setattr(user, attr, form_data.get(attr))

      db.session.add(user)
      db.session.commit()

      return jsonify(user.to_dict(), 200)
    else:
      return jsonify({"message": f"User {id} not found"})

  def post(self, id):
    user = User.query.get(id)
    if user:
      form_data = request.get_json()

      # Check if estimated finish time data is present in the request
      if 'estimated_finish_time_hours' in form_data and \
        'estimated_finish_time_minutes' in form_data and \
        'estimated_finish_time_seconds' in form_data:
        estimated_finish_time_hours = form_data.get('estimated_finish_time_hours')
        estimated_finish_time_minutes = form_data.get('estimated_finish_time_minutes')
        estimated_finish_time_seconds = form_data.get('estimated_finish_time_seconds')
        user.estimated_finish_time = (estimated_finish_time_hours * 3600) + \
        (estimated_finish_time_minutes * 60) + \
        estimated_finish_time_seconds

        db.session.add(user)
        db.session.commit()

        return jsonify({"message": f"Estimated finish time set for user with ID {id}"}, 200)
      else:
        return jsonify({"message": "Estimated finish time data not provided in the request"}, 400)
    else:
      return jsonify({"message": f"User {id} not found"}, 404)
    
  def delete(self, id):
    user = User.query.filter_by(id=id).first()
    if user:
      db.session.delete(user)
      db.session.commit()
      resp_body = {
          "message": f"User {user.name} successfully deleted",
          "id": id
      }
      return jsonify(resp_body, 200)
    else:
      return jsonify({"message": f"User {id} not found"})
# Adding the resource to your API
api.add_resource(UserById, '/api/user/<int:id>')

# class UserRaceEvents(Resource):
#   def get(self, n):
#     listOfUsers=[]
#     # loop through each user
#     users = User.query.all()
#     for eachUser in users:
#       if(len(eachUser.race_events)>= n):
#         listOfUsers.append(eachUser)
#     ser = [listUser.to_dict() for listUser in listOfUsers]
#     #printout list of Users
#     return ser, 201

# api.add_resource(UserRaceEvents,'/user_race_events/<int:n>')

# all users that have 3 or more raceEvents
# all users with 4 or more raceEvents 