from config import api, db, app
from flask import make_response, request
from flask_restful import Resource
from models.models import RaceEvent, RaceEventSchema

@app.route('/raceEvents', methods=['GET','PATCH'])
def raceEvents():
  if request.method == 'GET':
    raceEvents = RaceEvent.query.all()
    response_body = [event.to_dict() for event in raceEvents]
    return make_response(response_body, 200)
  
  elif request.method == 'PATCH':
    form_data = request.get_json()
    print(request)
    print(form_data)
    for attr in form_data: 
      print(attr)

# class RaceEventsResource(Resource):
#   def get(self):
#     events = RaceEvent.query.all()
#     schema = RaceEventSchema(many=True)
#     resp = schema.dump(events)
#     return make_response(resp, 200)
  
#   def post(self):
#     form_data = request.get_json()
#     new_event = RaceEvent(name=form_data.get('organization'))

#     db.session.add(new_event)
#     db.session.commit()

#     resp = RaceEventSchema.race_event_schema.dump(new_event)
#     return make_response(resp, 201)

# api.add_resource(RaceEventsResource, '/raceEvents')

# class RaceEventsById(Resource):
#   def get(self,id):
#     event = RaceEvent.query.filter_by(id=id).first()

#     if event:
#       resp = RaceEventSchema.race_event_schema.dump(event)
#       status_code = 200
#     else:
#       resp = { "message": f"Event {id} was not found."}
#       status_code = 404

#     return make_response(resp, status_code)
  
# api.add_resource(RaceEventsById, '/raceEvents/<int:id>')

