from config import api, db
from flask import jsonify, request
from flask_restful import Resource, reqparse
from models.models import RaceSignup, RaceSignupSchema

class RaceSignupsResource(Resource):
  def get(self):
    signups = RaceSignup.query.all()
    schema = RaceSignupSchema(many=True)
    resp = schema.dump(signups)
    return resp, 200

  def post(self):
    try: 
      form_data = request.get_json()
      if form_data is None:
        return jsonify({"error": "No JSON data provided in the request"}), 400
      new_signup = self.create_signup(form_data)
      db.session.add(new_signup)
      db.session.commit()

      resp = RaceSignupSchema().dump(new_signup)
      return resp, 201
    except Exception as e:
      db.session.rollback()
      print("Error:", e)
      return jsonify({"err": str(e)}), 500

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
