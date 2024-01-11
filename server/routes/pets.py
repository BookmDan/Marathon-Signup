from config import api
from flask_restful import Resource
from models.models import Pet

class PetsResource(Resource):
  def get(self):
    return [pet.to_dict() for pet in Pet.query.all()], 200

api.add_resource(PetsResource, '/pets')