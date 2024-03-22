import stripe
from flask import jsonify, session, request
from flask_restful import Resource, reqparse
from config import api,app, stripe_api_key, publishable_key

stripe.api_key = app.config.get("STRIPE_SECRET_KEY")

class CreateIntent(Resource):
  def post(self):
    parser = reqparse.RequestParser()
    parser.add_argument('amount', type=int, required=True)
    parser.add_argument('currency', type=str, required=True)
    args = parser.parse_args()

    intent = stripe.PaymentIntent.create(
      amount=args['amount'],
      currency=args['currency'],
      automatic_payment_methods={'enabled': True},
    )

    session['client_secret'] = intent.client_secret

    return jsonify(client_secret=intent.client_secret)

class GetClientSecret(Resource):
  def get(self):
    client_secret = session.get('client_secret')
    return jsonify(client_secret=client_secret)


class Config(Resource):
  def get(self):
    return jsonify({
      'publishableKey': publishable_key
    })
  
class CreateCheckoutSession(Resource):
  def post(self):
    data = request.get_json()
    products = data.get('products', [])
    
    line_items = []
    for product in products:
        line_items.append({
        'price_data': {
        'currency': 'usd',
        'product_data': {
          'name': product.get('name', ''),
          'images': [product.get('image', '')],
        },
        'unit_amount': int(product.get('price', 0) * 100),  # Convert to cents
      },
      'quantity': product.get('quantity', 1),
    })
        
        
    session = stripe.checkout.Session.create(
      payment_method_types=['card'],
      line_items=line_items,
      mode='payment',
      success_url="http://localhost:5174/success",
      cancel_url="http://localhost:5174/cancel"
    )
    return jsonify(id=session.id)

# Add resource route
api.add_resource(CreateCheckoutSession, '/create-checkout-session')
api.add_resource(CreateIntent, '/create-intent')
api.add_resource(GetClientSecret, '/get-client-secret')
api.add_resource(Config, '/config')
