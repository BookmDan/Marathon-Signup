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

  def patch(self, id):
    signup = RaceSignup.query.filter_by(id=id).first()
    if signup:
      form_data = request.get_json()
      for attr in form_data:
        setattr(signup, attr, form_data.get(attr))

      db.session.add(signup)
      db.session.commit()

      return make_response(signup.to_dict(), 200)
    else:
      return make_response({"message": f"Signup {id} not found"})

  def delete(self, id):
    signup = RaceSignup.query.filter_by(id=id).first()
    if signup:
      db.session.delete(signup)
      db.session.commit()
      resp_body = {
          "message": f"Signup {signup.id} successfully deleted",
          "id": id
      }
      return make_response(resp_body, 200)
    else:
      return make_response({"message": f"Signup {id} not found"})
