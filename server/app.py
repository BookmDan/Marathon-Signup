from config import app
from werkzeug.exceptions import NotFound

if __name__ == "__main__":
  app.run(port=5555, debug=True)

app.jsons.compact = False 
migrate = Migrate(app.db)
db.init_app(app)
api = Api(app)

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