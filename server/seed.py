from config import app, db
from models.models import Pet

if __name__ == "__main__":
  with app.app_context():
    Pet.query.delete()

    db.session.commit()

    pet_1 = Pet(name="Bob")
    pet_2 = Pet(name="Not Bob")
    pet_3 = Pet(name="Garfield")

    db.session.add_all([pet_1, pet_2, pet_3])
    db.session.commit()