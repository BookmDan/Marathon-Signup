# from flask import Flask, request, make_response, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS
# from flask_migrate import Migrate
# from flask_restful import Api, Resource
# from dotenv import load_dotenv
# from config import app, db, bcrypt, api
# from flask_login import LoginManager, login_user, logout_user, login_required, current_user
# from werkzeug.exceptions import NotFound
# import os
from models import db, Pet

# just contain routes 
from config import app, api
from flask_restful import Resource


class PetsResource(Resource):
    def get(self):
        return[pet.to_dict() for pet in Pet.query.all()], 200
    
api.add_resource(PetsResource, '/pets')
if __name__ == "__main__":
  app.run(port=5555, debug = True)


# app = Flask(__name__)
# CORS(app)

# # Load environment variables from .env file
# load_dotenv()
# # 
# # Configure Flask app
# app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.secret_key = os.getenv('FLASK_SECRET_KEY')

# # Initialize Flask extensions
# db.init_app(app)
# migrate = Migrate(app, db)
# api = Api(app)

# # Routes for Pomeranian-related data
# @app.route('/users', methods=['GET'])
# def get_users():
#     users = User.query.all()
#     response = jsonify([user.to_dict() for user in users])
#     return make_response(response, 200)

# # Add similar routes for Poms, PomAds, AdoptionRequests

# if __name__ == '__main__':
#     app.run(port=4000)


# login_manager = LoginManager(app)
# login_manager.login_view = 'login'
# app.json.compact = False 


    
# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.get(int(user_id))

# @app.before_request
# def authenticate():
#     # Check if the session key is present in the cookie
#     if 'user_id' in session:
#         # User is logged in
#         g.user = get_user_by_id(session['user_id'])
#     else:
#         # User is a guest
#         g.user = None
        
# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     username = data.get('username')
#     password = data.get('password')

#     # Validate user credentials
#     user = User.query.filter_by(username=username).first()
#     if user and bcrypt.check_password_hash(user.password, password):
#         login_user(user)
#         return jsonify({'message': 'Login successful'})

#     return jsonify({'message': 'Invalid credentials'}), 401

# @app.route('/logout')
# @login_required
# def logout():
#     logout_user()
#     return jsonify({'message': 'Logout successful'})

# # Example protected route
# @app.route('/protected')
# @login_required
# def protected():
#     return jsonify({'message': 'This is a protected route for the user: {}'.format(current_user.username)})


# # class Productions (Resource) :
# #   def get(self):
# #     production_list = [p.to_dict() for p in Production.query.all()] 

# #     response = make_response(
# #       production_list,
# #       200
# #     )
# #     return response
  
# #   def post(self):
# #     request_json = request.get_json()
# #     new_production = Production(
# #       title = request_json['title'],
# #       genre = request_json['genre'],
# #       budget = request_json['budget'],
# #       image = request_json['image'],
# #       director = request_json['director'],
# #       description = request_json['description'],
# #       ongoing = request_json['ongoing'],
# #     )

# #     db.session.add(new_production)
# #     db.session.commit()

# #     response_dict = new_production.to_dict()
    
# #     response = make_response(
# #       response_dict(),
# #       201
# #     )
# #     return response
  
# # class ProductionByID(Resource):
# #   def get(self, id):
# #     production = Production.query.filter_by(id=id).first()
# # # if production not found, show error message

# #     production_dict = production.to_dict()
# #     response = make_response(
# #       production_dict,
# #       200
# #     )
# #     return response

# # api.add_resource(ProductionByID, '/productions/<int:id>')

# # class Users(Resource):
# #   def post(self):
# #     form_json = request.get_json()
# #     new_user = User(
# #       name = form_json['name'],
# #       name = form_json['email']
# #     )
# #     db.session.add(new_user)
# #     db.session.commit()
# #     session['user_id'] = new_user.id
# #     response = make_response(
# #       new_user.to_dict(),
# #       201
# #     )
# #     return response
# # api.add_resource(Users,'/users')

# # class CastMembers(Resource):
# #   def get(self):
# #     cast_members_list = [cast_member.to_dict() for cast_member in CastMember.query.all()] 

# #     response = make_response(
# #       cast_members_list,
# #       200
# #     )
# #     return response
# #   def post(self):
# #     request_json = request.get_json()
# #     new_production = Production(
# #       title = request_json['title'],
# #       genre = request_json['genre'],
# #       budget = request_json['budget'],
# #       image = request_json['image'],
# #       director = request_json['director'],
# #       description = request_json['description'],
# #       ongoing = request_json['ongoing'],
# #     )

# #     db.session.add(new_production)
# #     db.session.commit()

# #     response_dict = new_production.to_dict()
    
# #     response = make_response(
# #       response_dict(),
# #       201
# #     )
# #     return response
  
# # api.add_resource(Productions, '/productions')

# # class ProductionByID(Resource):
# #   def get(self.id):
# #     production = Production.query.filter_by(id=id).first()

# #     production_dict = production.to_dict()
# #     response = make_response(
# #       production_dict,
# #       200
# #     )
# #     return response
  
# # # error handling 
# # @app.errorhandler(NotFound)
# # def handle_not_found(e):
# #   response= make_response(
# #     "NotFound: Sorry the resource you are looking for cannot be found!",
# #     404
# #   )
# #   return response

# if __name__ == "__main__":
#   app.run(port=5555, debug=True)
# #-------------------------

# from flask import Flask, request, make_response, jsonify
# from flask_cors import CORS
# from flask_migrate import Migrate
# from flask_cors import CORS

# from models import db, User

# app = Flask(__name__)
# CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.json.compact = False

# CORS(app)
# migrate = Migrate(app, db)

# db.init_app(app)

# @app.route('/users', methods =['GET', 'POST']) 
# def users():
#   if request.method =='GET':
#       users = User.query.order_by('id').all()
#       # flask doesn't serialize, so we do need it in object form
#       response = [ user.to_dict() for user in users] 
  
#   # elif request.method == 'POST':
#   #   data = request.get_json()
#   #   # get from model Message
#   #   user = User(
#   #       username = data['username']
#   #       email = data['email'],
#   #       password = data['password'],
#   #   )
#   #   # do something with message
#   #   db.session.add(user)
#   #   db.session.commit()
#   #   response = make_response(
#   #       jsonify(user.to_dict()), 201
#   #       # 201 http code created
#   #   )
#   return response
   

# # @app.route('/messages/<int:id>', methods =['GET', 'PATCH', 'DELETE'])
# # def messages_by_id(id):
# #     message = Message.query.filter_by(id=id).first()

# #     if request.method == 'PATCH':
# #         newMessageData = request.get_json()
# #         for key in newMessageData:
# #             setattr(message, key, newMessageData[key])
# #         db.session.add(message)
# #         db.session.commit()

# #         response = make_response(jsonify(message.to_dict()))
# #     elif request.method == 'DELETE':
# #         db.session.delete(message)
# #         db.session.commit()
# #         response = jsonify({'message': f'deleted message {id}'})
# #     return response

# if __name__ == '__main__':
#     app.run(port=4000, debug=True)
