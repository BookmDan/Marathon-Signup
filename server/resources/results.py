from flask import session, send_file
from flask_restful import Resource
import pandas as pd
from config import api
from models.user import User

class Results(Resource):
    def get(self):
        # Retrieve user data from session
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter_by(id=user_id).first()
            if user:
                # If the user is found, return user data as response
                response_body = user.to_dict()
                return response_body, 200
            else:
                return {"errors": "User not found"}, 404
        else:
            return {"errors": "User not logged in"}, 401

    def post(self):
        # Retrieve user data from session
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter_by(id=user_id).first()
            if user:
                # Convert user data to DataFrame
                df = pd.DataFrame([vars(user)])
                # Save DataFrame as Excel file
                df.to_excel('results.xlsx', index=False)
                # Send Excel file as attachment
                return send_file('results.xlsx', as_attachment=True)
            else:
                return {"errors": "User not found"}, 404
        else:
            return {"errors": "User not logged in"}, 401

# Route to handle authorized session and download results as Excel file
api.add_resource(Results, '/results')
