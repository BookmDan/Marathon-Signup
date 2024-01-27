from http.client import NOT_FOUND
from flask import jsonify, request, make_response
from config import app
from resources.routes import *
from models.models import *

@app.route('/dark_mode', methods = ['GET'])
def dark_mode():
  mode_cookie = request.cookies.get('mode', 'default_value_if_not_found')

  response = make_response(jsonify({
      "cookies": mode_cookie
  }), 200)
  return response

@app.errorhandler(NOT_FOUND)
def handle_not_found(e):
  response = make_response(
    "Not found",
    404
  )
  return response
   
api.add_resource(UsersById, '/users/<int:id>')
api.add_resource(Signup, '/signup') # is this correct
api.add_resource(CreditCardsById, '/creditcards/<int:id>')
api.add_resource(RaceEventsById, '/raceEvents/<int:id>')
api.add_resource(RaceSignupsById, '/raceSignups/<int:id>')
api.add_resource(UsersById, '/users/<int:id>')

if __name__ == "__main__":
  app.run(port=5555, debug=True)