from config import db
from sqlalchemy_serializer import SerializerMixin
from marshmallow import Schema, fields
from sqlalchemy import text
from marshmallow import Schema, fields

class ShoppingCart(db.Model):
  __tablename__ = "shopping_carts"
  id = db.Column(db.Integer, primary_key=True)
  race_cost = db.Column(db.Float)
  ship_packet_cost = db.Column(db.Float)
  cart_items = db.Column(db.Integer)
  tshirt_size = db.Column(db.String)
  coupon_code = db.Column(db.String)

  def __repr__(self):
    return f'<ShoppingCart id={self.id} race_cost={self.race_cost} ship_packet_cost={self.ship_packet_cost} cart_items={self.cart_items}>'
    

class ShoppingCartSchema(Schema):
  id = fields.Int(dump_only=True)
  race_cost = fields.Float(required=True)
  ship_packet_cost = fields.Float(required=True)
  tshirt_size = fields.Str(required=True)
  coupon_code = fields.Str(required=True)
  cart_items = fields.List(fields.Str(), required=True)