# from flask import session
# from flask_restful import Resource

# # Add your model imports
# from models.user import User

# class CheckSession(Resource):
#   def get(self):
#     user = User.query.filter_by(id = session.get('user_id')).first()
#     if user:
#       response_body = user.to_dict()
#       return response_body, 200
#     else:
#       return {"errors": "User not logged in"}, 401