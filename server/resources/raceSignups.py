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
  
  # def post(self):
  #   data = request.get_json()
  #   new_signup = RaceSignup(
  #     user_id = data['user_id'],
  #     race_event_id = data['race_event_id'],
  #     waiver_accept = data['waiver_accept'],
  #     tshirt_size = data['tshirt_size'],
  #     coupon_code = data['coupon_code'],
  #     ship_packet = data['ship_packet']
  #   )
  #   db.session.add(new_signup)
  #   db.session.commit()
  #   resp = new_signup.to_dict()
  #   return resp, 201

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

# class RaceSignupById(Resource):
#   def get(self, signup_id):
#     signup = RaceSignup.query.filter_by(id=signup_id).first()
#     if not signup:
#       return {'message': 'Race signup not found'}, 404 
#     else:
#       signup_dict = signup.to_dict()
    
#       return signup_dict, 200
    
#   def put(self, signup_id):
#     signup = RaceSignup.query.get(signup_id)
#     if not signup: 
#       return {'message':'Race signup not found'},404
#     data = request.get_json()
#     if 'tshirt_size' in data:
#       signup.tshirt_size = data['tshirt_size']
#     if 'coupon_code' in data:
#       signup.coupon_code = data['coupon_code']
#     db.session.commit()

#     resp = signup.to_dict()
#     return resp, 200
# api.add_resource(RaceSignupById,'/api/race-signups/<signup_id>')  

# class RaceSignupByUser(Resource):
#   def get(self, user_id):
#     signups = RaceSignup.query.filter_by(id=user_id).all()
#     ser  = [signup.to_dict() for signup in signups]
#     return ser, 200
# api.add_resource(RaceSignupByUser,'/api/race-signups?user_id=<user_id>')  