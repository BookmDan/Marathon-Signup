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

  # def get_by_ccid(self, ccid):
  #   credit_card = CreditCardInfo.query.get(ccid)

  #   if credit_card:
  #       resp = credit_card_info_schema.dump(credit_card)
  #       status_code = 200
  #   else:
  #       resp = {"message": f"Credit card with number {ccid} was not found."}
  #       status_code = 404

  #   return make_response(resp, status_code)

api.add_resource(CreditCardsResource, '/creditcards')

class CreditCardsById(Resource):
  def get(self, id):
    credit_card = CreditCardInfo.query.filter_by(id=id).first()

    if credit_card:
      resp = credit_card_info_schema.dump(credit_card)
      status_code = 200
    else:
      resp = {"message": f"Credit card with number {id} was not found."}
      status_code = 404

    return make_response(resp, status_code)
  
  def patch(self, id):
    credit_card = CreditCard.query.filter_by(id=id).first()
    if credit_card:
      form_data = request.get_json()
      for attr in form_data:
          setattr(credit_card, attr, form_data.get(attr))

      db.session.add(credit_card)
      db.session.commit()

      return make_response(credit_card.to_dict(), 200)
    else:
      return make_response({"message": f"Credit Card {id} not found"})

  def delete(self, id):
    credit_card = CreditCard.query.filter_by(id=id).first()
    if credit_card:
      db.session.delete(credit_card)
      db.session.commit()
      resp_body = {
          "message": f"Credit Card {credit_card.card_number} successfully deleted",
          "id": id
      }
      return make_response(resp_body, 200)
    else:
      return make_response({"message": f"Credit Card {id} not found"})

# Adding the resource to your API
api.add_resource(CreditCardsById, '/creditcards/<int:id>')