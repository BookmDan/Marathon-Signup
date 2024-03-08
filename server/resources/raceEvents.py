from config import api, db, app
from flask import request, jsonify, make_response
from flask_restful import Resource
from models.models import RaceEvent, RaceEventSchema

schema_instance = RaceEventSchema()

class RaceEventsResource(Resource):
  def get(self):
    events = RaceEvent.query.all()
    schema = RaceEventSchema(many=True)
    resp = schema.dump(events)
    return resp, 200
  
  def post(self):
    form_data = request.get_json()
    new_event = RaceEvent(
      organization=form_data.get('organization'), 
      race_name=form_data.get('race_name'), 
      race_type=form_data.get('race_type'))

    db.session.add_all(new_event)
    db.session.commit()


    resp = schema_instance.dump(new_event)
    return resp, 201

api.add_resource(RaceEventsResource, '/api/race-events')

class RaceEventsById(Resource):
  def get(self, id=None):
    if id is None:
      race_event = RaceEvent.query.first()
    else:
      race_event = RaceEvent.query.filter_by(id=id).first()

    if race_event:
      race_event_data = {
        'start_day': race_event.start_day,
        'start_time': race_event.start_time,
        'packetpickup_day': race_event.packetpickup_day,
        'packetpickup_location': race_event.packetpickup_location
      }
      return (race_event_data), 200
    else:
      return {'message': 'Race event data not found'}, 404
  
  def patch(self,id):
    event = RaceEvent.query.filter_by(id=id).first()
    if event:
      form_data = request.get_json()
      for attr in form_data:
        setattr(event, attr, form_data.get(attr))

      db.session.add(event)
      db.session.commit()

      return event.to_dict(), 200
    else:
      return {"message": f"Event {id} not found"}
  
  def delete(self,id):
    event = RaceEvent.query.filter_by(id=id).first()  
    if event:
      db.session.delete(event)
      db.session.commit()
      resp_body = {
        "message": f"Event {event.race_name} successfully deleted",
        "id": id
      }
      return resp_body,200
    else:
      return ({"message": f"Event {id} not found"})

api.add_resource(RaceEventsById, '/api/race-event','/api/race-event/<int:id>')

class BestRating(Resource):
  def get(self):
    ratings= request.args.get('ratings')
    if ratings is None:
      return {"message": "Missing 'ratings' param."}, 400
    # ratings = data.get("ratings")
    elif ratings =='5' :
      most_popular_events = RaceEvent.query.filter_by(ratings='5').all()
      serialized = [event.to_dict() for event in most_popular_events]
      return serialized, 200
    else:
      return {"message": "No race events found with the specified rating."}, 404 

api.add_resource(BestRating, '/api/most-popular')