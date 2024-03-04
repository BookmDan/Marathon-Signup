from config import api, db
from flask import jsonify, request
from flask_restful import Resource, reqparse
from models.models import RaceSignup, RaceSignupSchema

race_signup_schema = RaceSignupSchema()

class RaceSignupsResource(Resource):
  def get(self):
    signups = RaceSignup.query.all()
    schema = RaceSignupSchema(many=True)
    resp = schema.dump(signups)
    return jsonify(resp, 200)

  def post(self):
    form_data = request.get_json()
    new_signup = RaceSignup(
      user_id=form_data.get('user_id'),
      race_event_id=form_data.get('race_event_id'),
      waiver_accept=form_data.get('waiver_accept'),
      tshirt_size=form_data.get('tshirt_size'),
      # coupon_code=form_data.get('coupon_code'),
      # ship_packet=form_data.get('ship_packet', False) 
    )

    db.session.add(new_signup)
    db.session.commit()

    resp = race_signup_schema.dump(new_signup)
    return jsonify(resp, 201)
  
api.add_resource(RaceSignupsResource, '/api/race-signups')

class RaceSignupsById(Resource):
  def get(self, id):
    signup = RaceSignup.query.filter_by(id=id).first()

    if signup:
        resp = race_signup_schema.dump(signup)
        status_code = 200
    else:
        resp = {"message": f"RaceSignup with ID {id} was not found."}
        status_code = 404

    return jsonify(resp, status_code)
  parser = reqparse.RequestParser()
  parser.add_argument('waiver_accept', type=bool, required=True)
  parser.add_argument('tshirt_size', type=str, required=True)
  # parser.add_argument('coupon_code', type=str)
  # parser.add_argument('ship_packet', type=bool, default=False) 

  def post(self):
    args = RaceSignupsById.parser.parse_args()
    
    new_signup = RaceSignup(
      user_id=args['user_id'],
      race_event_id=args['race_event_id'],
      waiver_accept=args['waiver_accept'],
      tshirt_size=args['tshirt_size'],
    )

    db.session.add(new_signup)
    db.session.commit()

    resp = race_signup_schema.dump(new_signup)
    return jsonify(resp), 201
  
  def patch(self, id):
    signup = RaceSignup.query.filter_by(id=id).first()
    if signup:
      form_data = request.get_json()
      for attr in form_data:
        setattr(signup, attr, form_data.get(attr))

      db.session.add(signup)
      db.session.commit()

      return jsonify(signup.to_dict(), 200)
    else:
      return jsonify({"message": f"Signup {id} not found"})

  def delete(self, id):
    signup = RaceSignup.query.filter_by(id=id).first()
    if signup:
      db.session.delete(signup)
      db.session.commit()
      resp_body = {
          "message": f"Signup {signup.id} successfully deleted",
          "id": id
      }
      return jsonify(resp_body, 200)
    else:
      return jsonify({"message": f"Signup {id} not found"})
# Adding the resource to your API
api.add_resource(RaceSignupsById, '/api/race-signups/<int:id>')