from config import db
from sqlalchemy_serializer import SerializerMixin
  
class CreditCardInfo(db.Model, SerializerMixin):
  __tablename__ = 'credit_card_info'

  credit_card_number = db.Column(db.String, primary_key=True)
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
    return f'<CreditCardInfo creditCardNumber={self.creditCardNumber} user_id={self.user_id}>'