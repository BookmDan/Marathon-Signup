from http.client import NOT_FOUND
from flask import jsonify, request, make_response, render_template
from config import app
from resources.routes import *
from models.models import *

@app.errorhandler(NOT_FOUND)
def handle_not_found(e):
  response = jsonify(message="Not found")
  return response, NOT_FOUND

api.add_resource(AuthorizedSession, '/api/check-session')
api.add_resource(Signup, '/api/signup')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

if __name__ == "__main__":
  app.run(port=5555, debug=True)