from config import api, db
from flask import make_response, request
from flask_restful import Resource
from models.models import RaceSignup, RaceSignupSchema

race_signup_schema = RaceSignupSchema()

class RaceSignupsResource(Resource):
  def get(self):
    signups = RaceSignup.query.all()
    schema = RaceSignupSchema(many=True)
    resp = schema.dump(signups)
    return make_response(resp, 200)

  def post(self):
    form_data = request.get_json()
    new_signup = RaceSignup(
      user_id=form_data.get('user_id'),
      race_event_id=form_data.get('race_event_id'),
      waiver_accept=form_data.get('waiver_accept'),
      tshirt_size=form_data.get('tshirt_size'),
      coupon_code=form_data.get('coupon_code')
    )

    db.session.add(new_signup)
    db.session.commit()

    resp = race_signup_schema.dump(new_signup)
    return make_response(resp, 201)
  
  def get_by_id(self, signup_id):
    signup = RaceSignup.query.get(signup_id)

    if signup:
        resp = race_signup_schema.dump(signup)
        status_code = 200
    else:
        resp = {"message": f"RaceSignup with ID {signup_id} was not found."}
        status_code = 404

    return make_response(resp, status_code)
  
api.add_resource(RaceSignupsResource, '/raceSignups', '/raceSignups/<int:signup_id>')
