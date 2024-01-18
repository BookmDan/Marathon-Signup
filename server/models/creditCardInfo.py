from config import db
from sqlalchemy_serializer import SerializerMixin
from marshmallow import Schema, fields
  
class CreditCardInfo(db.Model, SerializerMixin):
  __tablename__ = 'credit_card_info'
  id = db.Column(db.Integer, primary_key=True)
  credit_card_number = db.Column(db.String, nullable=False, unique=True)
  name_on_card = db.Column(db.String)
  expiration_date = db.Column(db.String)
  cvv = db.Column(db.String)
  street_address = db.Column(db.String)
  country = db.Column(db.String)
  zipcode = db.Column(db.String)
  city = db.Column(db.String)
  state = db.Column(db.String)
  save_my_card = db.Column(db.Boolean)

  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
  user = db.relationship('User', back_populates='credit_card_info')

  def __repr__(self):
    return f'<CreditCardInfo id={self.id} credit_card_number={self.credit_card_number} name_on_card={self.name_on_card}>'

    # return f'<CreditCardInfo creditCardNumber={self.creditCardNumber} user_id={self.user_id}>'
  
class CreditCardInfoSchema(Schema):
  id = fields.Int(dump_only=True, primary_key=True)
  credit_card_number = fields.Str(required=True)
  name_on_card = fields.Str()
  expiration_date = fields.Str()
  cvv = fields.Str()
  street_address = fields.Str()
  country = fields.Str()
  zipcode = fields.Str()
  city = fields.Str()
  state = fields.Str()
  save_my_card = fields.Boolean()

# credit_card_info_schema = CreditCardInfoSchema()
