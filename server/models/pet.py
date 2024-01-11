from config import db
from sqlalchemy_serializer import SerializerMixin

class Pet(db.Model, SerializerMixin):
  __tablename__ = "pets"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)

  def __repr__(self):
    return f'<Pet id={self.id} name={self.name}>'