from config import api, db
from flask import make_response, request
from flask_restful import Resource
from models.models import User, UserSchema

user_schema = UserSchema()

class UsersResource(Resource):
  def get(self):
    users = User.query.all()
    schema = UserSchema(many=True)
    resp = schema.dump(users)
    return make_response(resp, 200)

  def post(self):
    form_data = request.get_json()
    new_user = User(
      name=form_data.get('name'),
      email=form_data.get('email'),
      phone_number=form_data.get('phone_number'),
      password=form_data.get('password')
    ) 
    
    db.session.add(new_user)
    db.session.commit()

    resp = user_schema.dump(new_user)
    return make_response(resp, 201)
  
  # def get_by_id(self, user_id):
  #   user = User.query.get(user_id)

  #   if user:
  #       resp = user_schema.dump(user)
  #       status_code = 200
  #   else:
  #       resp = {"message": f"User with ID {user_id} was not found."}
  #       status_code = 404

  #   return make_response(resp, status_code)
  
api.add_resource(UsersResource, '/users')

class UsersById(Resource):
  def get(self, id):
    user = User.query.get(id)

    if user:
      resp = user_schema.dump(user)
      status_code = 200
    else:
      resp = {"message": f"User with ID {id} was not found."}
      status_code = 404

    return make_response(resp, status_code)
  
  def patch(self, id):
    user = User.query.filter_by(id=id).first()
    if user:
      form_data = request.get_json()
      for attr in form_data:
          setattr(user, attr, form_data.get(attr))

      db.session.add(user)
      db.session.commit()

      return make_response(user.to_dict(), 200)
    else:
      return make_response({"message": f"User {id} not found"})

  def delete(self, id):
    user = User.query.filter_by(id=id).first()
    if user:
      db.session.delete(user)
      db.session.commit()
      resp_body = {
          "message": f"User {user.username} successfully deleted",
          "id": id
      }
      return make_response(resp_body, 200)
    else:
      return make_response({"message": f"User {id} not found"})
# Adding the resource to your API
api.add_resource(UsersById, '/users/<int:id>')