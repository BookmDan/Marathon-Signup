from config import api, db
from flask import jsonify, request
from flask_restful import Resource, reqparse
from models.models import RaceSignup, RaceSignupSchema

class RaceSignupsResource(Resource):
  def get(self):
    signups = RaceSignup.query.all()
    schema = RaceSignupSchema(many=True)
    resp = schema.dump(signups)
    return jsonify(resp, 200)

  def post(self):
    form_data = request.get_json()
    new_signup = self.create_signup(form_data)
    db.session.add(new_signup)
    db.session.commit()

    resp = RaceSignupSchema().dump(new_signup)
    return jsonify(resp, 201)
  
  def create_signup(self,form_data):
    return RaceSignup(
      user_id=form_data.get('user_id'),
      race_event_id=form_data.get('race_event_id'),
      waiver_accept=form_data.get('waiver_accept'),
      tshirt_size=form_data.get('tshirt_size'),
      coupon_code=form_data.get('coupon_code'),
      ship_packet=form_data.get('ship_packet', False) 
    )
api.add_resource(RaceSignupsResource, '/api/race-signups')