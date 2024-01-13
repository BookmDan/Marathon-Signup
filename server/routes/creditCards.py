from flask import make_response, request
from flask_restful import Resource
from models.models import CreditCardInfo, CreditCardInfoSchema
from config import db, api

credit_card_info_schema = CreditCardInfoSchema()

class CreditCardsResource(Resource):
  def get(self):
    credit_cards = CreditCardInfo.query.all()
    schema = CreditCardInfoSchema(many=True)
    resp = schema.dump(credit_cards)
    return make_response(resp, 200)

  def post(self):
    form_data = request.get_json()
    new_credit_card = CreditCardInfo(
        credit_card_number=form_data.get('credit_card_number'),
        name_on_card=form_data.get('name_on_card'),
        expiration_date=form_data.get('expiration_date'),
        cvv=form_data.get('cvv'),
        street_address=form_data.get('street_address'),
        country=form_data.get('country'),
        zipcode=form_data.get('zipcode'),
        city=form_data.get('city'),
        state=form_data.get('state'),
        save_my_card=form_data.get('save_my_card')
    )

    db.session.add(new_credit_card)
    db.session.commit()

    resp = credit_card_info_schema.dump(new_credit_card)
    return make_response(resp, 201)

  def get_by_ccid(self, ccid):
    credit_card = CreditCardInfo.query.get(ccid)

    if credit_card:
        resp = credit_card_info_schema.dump(credit_card)
        status_code = 200
    else:
        resp = {"message": f"Credit card with number {ccid} was not found."}
        status_code = 404

    return make_response(resp, status_code)

api.add_resource(CreditCardsResource, '/creditcards',  '/creditcards/<string:credit_card_number>')
