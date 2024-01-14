from config import api, db, app
from flask import make_response, request
from flask_restful import Resource
from models.models import RaceEvent, RaceEventSchema

# @app.route('/raceEvents', methods=['GET','PATCH'])
# def raceEvents():
#   if request.method == 'GET':
#     raceEvents = RaceEvent.query.all()
#     response_body = [event.to_dict() for event in raceEvents]
#     return make_response(response_body, 200)
  
#   elif request.method == 'PATCH':
#     form_data = request.get_json()
#     print(request)
#     print(form_data)
#     for attr in form_data: 
#       print(attr)
schema_instance = RaceEventSchema()

class RaceEventsResource(Resource):
  def get(self):
    events = RaceEvent.query.all()
    schema = RaceEventSchema(many=True)
    resp = schema.dump(events)
    return make_response(resp, 200)
  
  def post(self):
    form_data = request.get_json()
    new_event = RaceEvent(name=form_data.get('organization'))

    db.session.add(new_event)
    db.session.commit()


    resp = schema_instance.dump(new_event)
    return make_response(resp, 201)

api.add_resource(RaceEventsResource, '/raceEvents')

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
        "message": f"Event {event.name} successfully deleted",
        "id": id
      }
      return make_response(resp_body,200)
    else:
      return make_response({"message": f"Event {id} not found"})

api.add_resource(RaceEventsById, '/raceEvents/<int:id>')

