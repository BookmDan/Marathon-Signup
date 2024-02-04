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
        user1 = User(first_name="John", last_name="Doe", email="john@example.com", phone_number="1234567890", _password_hash="12341234")
        user2 = User(first_name="Jane", last_name="Doe", email="jane@example.com", phone_number="9876543210", _password_hash="12342345")
        db.session.add_all([user1, user2])
        db.session.commit()

        # Create race events
        race_event1 = RaceEvent(race_name="Better Half", organization="BigHearts", race_type="5k", price_5k=35.0) #
        race_event2 = RaceEvent(race_name="Orca 3000", organization="10000Runs", race_type="10k"  price_10k=45.0) #
        db.session.add_all([race_event1, race_event2])
        db.session.commit()

        # Create credit card information
        credit_card1 = CreditCardInfo( credit_card_number="1234567890123456", name_on_card="John Doe", expiration_date="12/25", cvv="123", street_address="789 Elm St", country="US", zipcode="67890", city="Villagetown", state="VT", save_my_card=True)
        credit_card2 = CreditCardInfo(credit_card_number="9876543210987654", name_on_card="Jane Doe", expiration_date="06/23", cvv="456", street_address="321 Pine St", country="US", zipcode="54321", city="Towndale", state="TS", save_my_card=False)
        db.session.add_all([credit_card1, credit_card2])
        db.session.commit()

        # Create race signups
        race_signup1 = RaceSignup(waiver_accept=True, tshirt_size="S", coupon_code="DEF456", user=user1, race_event=race_event1)
        race_signup2 = RaceSignup(waiver_accept=True, tshirt_size="XL", coupon_code="GHI789", user=user2, race_event=race_event2)
        db.session.add_all([race_signup1, race_signup2])
        db.session.commit()