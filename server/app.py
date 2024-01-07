from flask import Flask, request, make_response, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api, Resource
from config import app
from werkzeug.exceptions import NotFound

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  
# db = SQLAlchemy(app)
# migrate = Migrate(app.db)

api = Api(app)

app.jsons.compact = False 
# db.init_app(app)

if __name__ == "__main__":
  app.run(port=5555, debug=True)

class PomAd(db.Model):
  __tablename__ = 'pomads'

  ad_id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
  title = db.Column(db.String, nullable=False)
  description = db.Column(db.Text, nullable=False, comment='Content of the post')
  created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)

  # Relationship with User model
  user = db.relationship('User', backref=db.backref('pomads', lazy=True))

  def __repr__(self):
      return f'<PomAd {self.ad_id}, {self.title}, {self.user.username}>'

# User model
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    address_line1 = db.Column(db.String)
    address_line2 = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    postal_code = db.Column(db.String)

    def __repr__(self):
        return f'<User {self.id}, {self.username}, {self.email}>'
    
class Productions (Resource) :
  def get(self):
    production_list = [p.to_dict() for p in Production.query.all()] 

    response = make_response(
      production_list,
      200
    )
    return response
  
  def post(self):
    request_json = request.get_json()
    new_production = Production(
      title = request_json['title'],
      genre = request_json['genre'],
      budget = request_json['budget'],
      image = request_json['image'],
      director = request_json['director'],
      description = request_json['description'],
      ongoing = request_json['ongoing'],
    )

    db.session.add(new_production)
    db.session.commit()

    response_dict = new_production.to_dict()
    
    response = make_response(
      response_dict(),
      201
    )
    return response
  
class ProductionByID(Resource):
  def get(self, id):
    production = Production.query.filter_by(id=id).first()
# if production not found, show error message

    production_dict = production.to_dict()
    response = make_response(
      production_dict,
      200
    )
    return response

api.add_resource(ProductionByID, '/productions/<int:id>')

class Users(Resource):
  def post(self):
    form_json = request.get_json()
    new_user = User(
      name = form_json['name'],
      name = form_json['email']
    )
    db.session.add(new_user)
    db.session.commit()
    session['user_id'] = new_user.id
    response = make_response(
      new_user.to_dict(),
      201
    )
    return response
api.add_resource(Users,'/users')

class CastMembers(Resource):
  def get(self):
    cast_members_list = [cast_member.to_dict() for cast_member in CastMember.query.all()] 

    response = make_response(
      cast_members_list,
      200
    )
    return response
  def post(self):
    request_json = request.get_json()
    new_production = Production(
      title = request_json['title'],
      genre = request_json['genre'],
      budget = request_json['budget'],
      image = request_json['image'],
      director = request_json['director'],
      description = request_json['description'],
      ongoing = request_json['ongoing'],
    )

    db.session.add(new_production)
    db.session.commit()

    response_dict = new_production.to_dict()
    
    response = make_response(
      response_dict(),
      201
    )
    return response
  
api.add_resource(Productions, '/productions')

class ProductionByID(Resource):
  def get(self.id):
    production = Production.query.filter_by(id=id).first()

    production_dict = production.to_dict()
    response = make_response(
      production_dict,
      200
    )
    return response
  
# error handling 
@app.errorhandler(NotFound)
def handle_not_found(e):
  response= make_response(
    "NotFound: Sorry the resource you are looking for cannot be found!",
    404
  )
  return response