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
  
api.add_resource(RaceSignupsResource, '/raceSignups')

class RaceSignupsById(Resource):
  def get(self, id):
    signup = RaceSignup.query.filter_by(id=id).first()

    if signup:
        resp = race_signup_schema.dump(signup)
        status_code = 200
    else:
        resp = {"message": f"RaceSignup with ID {id} was not found."}
        status_code = 404

    return make_response(resp, status_code)

# Adding the resource to your API
api.add_resource(RaceSignupsById, '/raceSignups/<int:id>')