from config import api, db
from flask import make_response, request
from flask_restful import Resource
from models.models import RaceEvent

class RaceEventsResource(Resource):
  def get(self):
    events = RaceEvent.query.all()
    resp = [event.to_dict() for event in events]
    return make_response(resp, 200)
  
  def post(self):
    form_data = request.get_json()
    new_event = RaceEvent(name = form_data.get('race_name'))

    db.session.add(new_event)
    db.session.commit()

    return make_response(new_event.to_dict(), 201)

api.add_resource(RaceEventsResource, '/raceEvents')

class RaceEventsById(Resource):
  def get(self,id):
    event = RaceEvent.query.filter_by(id=id).first()

    if event:
      resp = event.to_dict()
      status_code = 200
    else:
      resp = { "message": f"Event {id} was not found."}
      status_code = 404

    return make_response(resp, status_code)
  
api.add_resource(RaceEventsById, '/raceEvents<int:id>')

