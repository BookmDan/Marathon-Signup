from flask import session, jsonify, request
from flask_restful import Resource
from config import api, db
from models.shoppingCart import ShoppingCart

class ShoppingCart(Resource):
  def get(self):
      # Retrieve shopping cart data from session
    shopping_cart_id = session.get('shopping_cart_id')
    if shopping_cart_id:
      shopping_cart = ShoppingCart.query.get(shopping_cart_id)
      if shopping_cart:
              # If the shopping cart is found, return its data as response
        response_body = {
          "id": shopping_cart.id,
          "race_cost": shopping_cart.race_cost,
          "ship_packet_cost": shopping_cart.ship_packet_cost,
          "tshirt_size": shopping_cart.tshirt_size,
          "coupon_code": shopping_cart.coupon_code,
          "cart_items": shopping_cart.cart_items
        }
        return response_body, 200
      else:
        return {"errors": "Shopping cart not found"}, 404
    else:
      return {"errors": "Shopping cart not created yet"}, 404

  def post(self):
    data = request.get_json()
    try:
            # Create a new shopping cart instance
      shopping_cart = ShoppingCart(
        race_cost=data.get('race_cost'),
        ship_packet_cost=data.get('ship_packet_cost'),
        tshirt_size=data.get('tshirt_size'),
        coupon_code=data.get('coupon_code'),
        cart_items=data.get('cart_items')
      )
      db.session.add(shopping_cart)
      db.session.commit()

            # Save shopping cart ID in session
      session['shopping_cart_id'] = shopping_cart.id

      return {"message": "Shopping cart created successfully"}, 201
    except Exception as e:
      return {"errors": str(e)}, 422

# Route to handle shopping cart operations
api.add_resource(ShoppingCart, '/shopping_cart')
