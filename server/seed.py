# from config import app, db
# from models.models import Pet

# if __name__ == "__main__":
#   with app.app_context():
#     Pet.query.delete()

#     db.session.commit()

#     pet_1 = Pet(name="Bob")
#     pet_2 = Pet(name="Not Bob")
#     pet_3 = Pet(name="Garfield")

#     db.session.add_all([pet_1, pet_2, pet_3])
#     db.session.commit()

from config import app, db
from models.models import User, RaceSignup, RaceEvent, CreditCardInfo

if __name__ == "__main__":
    with app.app_context():
        # Clear existing data
        db.session.query(User).delete()
        db.session.query(RaceSignup).delete()
        db.session.query(RaceEvent).delete()
        db.session.query(CreditCardInfo).delete()
        db.session.commit()

        # Create users
        user1 = User(name="John Doe", email="john@example.com", phone_number="1234567890", password="12345")
        user2 = User(name="Jane Doe", email="jane@example.com", phone_number="9876543210", password="23456")
        db.session.add_all([user1, user2])
        db.session.commit()

        # Create race events
        race_event1 = RaceEvent(race_name="Better Half", organization="BigHearts", race_type="5k") #
        race_event2 = RaceEvent(race_name="Orca 3000", organization="10000Runs", race_type="10k") #
        db.session.add_all([race_event1, race_event2])
        db.session.commit()

        # Create credit card information
        credit_card1 = CreditCardInfo(id = 1, credit_card_number="1234567890123456", name_on_card="John Doe", expiration_date="12/25", cvv="123", street_address="789 Elm St", country="US", zipcode="67890", city="Villagetown", state="VT", save_my_card=True)
        credit_card2 = CreditCardInfo(id = 2, credit_card_number="9876543210987654", name_on_card="Jane Doe", expiration_date="06/23", cvv="456", street_address="321 Pine St", country="US", zipcode="54321", city="Towndale", state="TS", save_my_card=False)
        db.session.add_all([credit_card1, credit_card2])
        db.session.commit()

        # Create race signups
        race_signup1 = RaceSignup(waiver_accept=True, tshirt_size="S", coupon_code="DEF456", user=user1, race_event=race_event1)
        race_signup2 = RaceSignup(waiver_accept=True, tshirt_size="XL", coupon_code="GHI789", user=user2, race_event=race_event2)
        db.session.add_all([race_signup1, race_signup2])
        db.session.commit()