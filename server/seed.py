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
        race_events_data = [
            {"race_name": "Better Half", "organization": "BigHearts", "race_type": "5k"},
            {"race_name": "Better Half", "organization": "BigHearts", "race_type": "10k"},
            {"race_name": "Better Half", "organization": "BigHearts", "race_type": "Half Marathon"},
            {"race_name": "Better Half", "organization": "BigHearts", "race_type": "Full Marathon"},
            {"race_name": "Orca 3000", "organization": "10000Runs", "race_type": "5k"},
            {"race_name": "Orca 3000", "organization": "10000Runs", "race_type": "10k"},
            {"race_name": "Orca 3000", "organization": "10000Runs", "race_type": "Half Marathon"},
            {"race_name": "Orca 3000", "organization": "10000Runs", "race_type": "Full Marathon"},
            {"race_name": "Crazy Dash", "organization": "FunRuns", "race_type": "5k"},
            {"race_name": "Crazy Dash", "organization": "FunRuns", "race_type": "10k"},
            {"race_name": "Crazy Dash", "organization": "FunRuns", "race_type": "Half Marathon"},
            {"race_name": "Crazy Dash", "organization": "FunRuns", "race_type": "Full Marathon"},
            {"race_name": "Mud Madness", "organization": "ExtremeEvents", "race_type": "5k"},
            {"race_name": "Mud Madness", "organization": "ExtremeEvents", "race_type": "10k"},
            {"race_name": "Mud Madness", "organization": "ExtremeEvents", "race_type": "Half Marathon"},
            {"race_name": "Mud Madness", "organization": "ExtremeEvents", "race_type": "Full Marathon"},
            {"race_name": "Color Run", "organization": "HappyFeet", "race_type": "5k"},
            {"race_name": "Color Run", "organization": "HappyFeet", "race_type": "10k"},
            {"race_name": "Color Run", "organization": "HappyFeet", "race_type": "Half Marathon"},
            {"race_name": "Color Run", "organization": "HappyFeet", "race_type": "Full Marathon"},
            # Add more race events with different race names and types
        ]

        # Loop through the race events data and create RaceEvent objects
        race_event_objects = [RaceEvent(**race_event_data) for race_event_data in race_events_data]
        db.session.add_all(race_event_objects)
        db.session.commit()


        # Create credit card information
        credit_card1 = CreditCardInfo( credit_card_number="1234567890123456", name_on_card="John Doe", expiration_date="12/25", cvv="123", street_address="789 Elm St", country="US", zipcode="67890", city="Villagetown", state="VT", save_my_card=True)
        credit_card2 = CreditCardInfo(credit_card_number="9876543210987654", name_on_card="Jane Doe", expiration_date="06/23", cvv="456", street_address="321 Pine St", country="US", zipcode="54321", city="Towndale", state="TS", save_my_card=False)
        db.session.add_all([credit_card1, credit_card2])
        db.session.commit()

        # Loop through the race events data and create RaceEvent objects
       # Dictionary to store dynamically created race events
        race_event_dict = {}

        # Loop through the race events data and create RaceEvent objects
        for i, race_event_data in enumerate(race_events_data, start=1):
            race_name = race_event_data["race_name"]
            race_type = race_event_data["race_type"]
            race_event_name = f"race_event{i}"
            
            # Query the database for the specific race event
            race_event = RaceEvent.query.filter_by(race_name=race_name, race_type=race_type).first()
            
            # Assign the queried race event to the dynamically created variable
            race_event_dict[race_event_name] = race_event

        # Create race signups for each combination of user and race event
        users = [user1, user2]  # List of User instances
        race_events = [race_event_dict[f"race_event{i}"] for i in range(1, len(race_events_data) + 1)]  # List of RaceEvent instances

        # Loop through each combination of user and race event
        for user in users:
            for race_event in race_events:
                # Create a RaceSignup instance for each combination
                race_signup = RaceSignup(waiver_accept=True, tshirt_size="S", coupon_code="DEF456", user=user, race_event=race_event)
                db.session.add(race_signup)

        # Commit the changes to the database
        db.session.commit()



        # Create race signups
        # race_signup1 = RaceSignup(waiver_accept=True, tshirt_size="S", coupon_code="DEF456", user=user1, race_event=race_event1)
        # race_signup2 = RaceSignup(waiver_accept=True, tshirt_size="XL", coupon_code="GHI789", user=user2, race_event=race_event2)

