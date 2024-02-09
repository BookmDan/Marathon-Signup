from config import api, db, app
from flask import make_response, request
from flask_restful import Resource
from models.models import RaceEvent, RaceEventSchema

schema_instance = RaceEventSchema()

class RaceEventsResource(Resource):
  def get(self):
    events = RaceEvent.query.all()
    schema = RaceEventSchema(many=True)
    resp = schema.dump(events)
    return make_response(resp, 200)
  
  def post(self):
    form_data = request.get_json()
    new_event = RaceEvent(
      organization=form_data.get('organization'), 
      race_name=form_data.get('race_name'), 
      race_type=form_data.get('race_type'))


    db.session.add_all(new_event)
    db.session.commit()


    resp = schema_instance.dump(new_event)
    return make_response(resp, 201)

api.add_resource(RaceEventsResource, '/api/raceEvents')

class RaceEventsById(Resource):
  def get(self,id):
    event = RaceEvent.query.filter_by(id=id).first()

    if event:
      resp = schema_instance.dump(event)
      status_code = 200
    else:
      resp = { "message": f"Event {id} was not found."}
      status_code = 404

    return make_response(resp, status_code)
  
  def patch(self,id):
    event = RaceEvent.query.filter_by(id=id).first()
    if event:
      form_data = request.get_json()
      for attr in form_data:
        setattr(event, attr, form_data.get(attr))

      db.session.add(event)
      db.session.commit()

      return make_response(event.to_dict(), 200)
    else:
      return make_response({"message": f"Event {id} not found"})
  
  def delete(self,id):
    event = RaceEvent.query.filter_by(id=id).first()  
    if event:
      db.session.delete(event)
      db.session.commit()
      resp_body = {
        "message": f"Event {event.race_name} successfully deleted",
        "id": id
      }
      return make_response(resp_body,200)
    else:
      return make_response({"message": f"Event {id} not found"})

api.add_resource(RaceEventsById, '/api/raceEvents/<int:id>')