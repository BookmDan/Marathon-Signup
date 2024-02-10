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
        user1 = User(first_name="John", last_name="Doe", email="john@example.com", phone_number="1234567890", _password_hash="12341234",estimated_finish_time=3600, )
        user2 = User(first_name="Jane", last_name="Doe", email="jane@example.com", phone_number="9876543210", _password_hash="12342345",estimated_finish_time=3600,)
        db.session.add_all([user1, user2])
        db.session.commit()

        # Create race events
        race_events_data = [
             {"race_name": "Better Half", "organization": "BigHearts", "race_type": "5k", "start_time": "8:00 AM", "start_day": "2024-07-15", "packetpickup_day": "2024-07-13", "packetpickup_location": "123 Main St, City, State", "location": "456 Elm St, City, State"},
            {"race_name": "Better Half", "organization": "BigHearts", "race_type": "10k", "start_time": "9:00 AM", "start_day": "2024-07-15", "packetpickup_day": "2024-07-13", "packetpickup_location": "123 Main St, City, State", "location": "456 Elm St, City, State"},
            {"race_name": "Better Half", "organization": "BigHearts", "race_type": "Half Marathon", "start_time": "10:00 AM", "start_day": "2024-07-15", "packetpickup_day": "2024-07-13", "packetpickup_location": "123 Main St, City, State", "location": "456 Elm St, City, State"},
            {"race_name": "Better Half", "organization": "BigHearts", "race_type": "Full Marathon", "start_time": "11:00 AM", "start_day": "2024-07-15", "packetpickup_day": "2024-07-13", "packetpickup_location": "123 Main St, City, State", "location": "456 Elm St, City, State"},
            {"race_name": "Orca 3000", "organization": "10000Runs", "race_type": "5k", "start_time": "8:30 AM", "start_day": "2024-07-20", "packetpickup_day": "2024-07-18", "packetpickup_location": "456 Oak St, City, State", "location": "789 Pine St, City, State"},
            {"race_name": "Orca 3000", "organization": "10000Runs", "race_type": "10k", "start_time": "9:30 AM", "start_day": "2024-07-20", "packetpickup_day": "2024-07-18", "packetpickup_location": "456 Oak St, City, State", "location": "789 Pine St, City, State"},
            {"race_name": "Orca 3000", "organization": "10000Runs", "race_type": "Half Marathon", "start_time": "10:30 AM", "start_day": "2024-07-20", "packetpickup_day": "2024-07-18", "packetpickup_location": "456 Oak St, City, State", "location": "789 Pine St, City, State"},
            {"race_name": "Orca 3000", "organization": "10000Runs", "race_type": "Full Marathon", "start_time": "11:30 AM", "start_day": "2024-07-20", "packetpickup_day": "2024-07-18", "packetpickup_location": "456 Oak St, City, State", "location": "789 Pine St, City, State"},
            {"race_name": "Crazy Dash", "organization": "FunRuns", "race_type": "5k", "start_time": "9:00 AM", "start_day": "2024-07-25", "packetpickup_day": "2024-07-23", "packetpickup_location": "789 Maple St, City, State", "location": "123 Oak St, City, State"},
            {"race_name": "Crazy Dash", "organization": "FunRuns", "race_type": "10k", "start_time": "10:00 AM", "start_day": "2024-07-25", "packetpickup_day": "2024-07-23", "packetpickup_location": "789 Maple St, City, State", "location": "123 Oak St, City, State"},
            {"race_name": "Crazy Dash", "organization": "FunRuns", "race_type": "Half Marathon", "start_time": "11:00 AM", "start_day": "2024-07-25", "packetpickup_day": "2024-07-23", "packetpickup_location": "789 Maple St, City, State", "location": "123 Oak St, City, State"},
            {"race_name": "Crazy Dash", "organization": "FunRuns", "race_type": "Full Marathon", "start_time": "12:00 PM", "start_day": "2024-07-25", "packetpickup_day": "2024-07-23", "packetpickup_location": "789 Maple St, City, State", "location": "123 Oak St, City, State"},
            {"race_name": "Mud Madness", "organization": "ExtremeEvents", "race_type": "5k", "start_time": "8:00 AM", "start_day": "2024-07-30", "packetpickup_day": "2024-07-28", "packetpickup_location": "456 Pine St, City, State", "location": "789 Elm St, City, State"},
            {"race_name": "Mud Madness", "organization": "ExtremeEvents", "race_type": "10k", "start_time": "9:00 AM", "start_day": "2024-07-30", "packetpickup_day": "2024-07-28", "packetpickup_location": "456 Pine St, City, State", "location": "789 Elm St, City, State"},
            {"race_name": "Mud Madness", "organization": "ExtremeEvents", "race_type": "Half Marathon", "start_time": "10:00 AM", "start_day": "2024-07-30", "packetpickup_day": "2024-07-28", "packetpickup_location": "456 Pine St, City, State", "location": "789 Elm St, City, State"},
            {"race_name": "Mud Madness", "organization": "ExtremeEvents", "race_type": "Full Marathon", "start_time": "11:00 AM", "start_day": "2024-07-30", "packetpickup_day": "2024-07-28", "packetpickup_location": "456 Pine St, City, State", "location": "789 Elm St, City, State"},
            {"race_name": "Color Run", "organization": "HappyFeet", "race_type": "5k", "start_time": "8:30 AM", "start_day": "2024-08-05", "packetpickup_day": "2024-08-03", "packetpickup_location": "789 Oak St, City, State", "location": "123 Maple St, City, State"},
            {"race_name": "Color Run", "organization": "HappyFeet", "race_type": "10k", "start_time": "9:30 AM", "start_day": "2024-08-05", "packetpickup_day": "2024-08-03", "packetpickup_location": "789 Oak St, City, State", "location": "123 Maple St, City, State"},
            {"race_name": "Color Run", "organization": "HappyFeet", "race_type": "Half Marathon", "start_time": "10:30 AM", "start_day": "2024-08-05", "packetpickup_day": "2024-08-03", "packetpickup_location": "789 Oak St, City, State", "location": "123 Maple St, City, State"},
            {"race_name": "Color Run", "organization": "HappyFeet", "race_type": "Full Marathon", "start_time": "11:30 AM", "start_day": "2024-08-05", "packetpickup_day": "2024-08-03", "packetpickup_location": "789 Oak St, City, State", "location": "123 Maple St, City, State"},
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

        race_event1 = race_event_objects[0]
        race_event2 = race_event_objects[1]

        # Loop through each combination of user and race event
        for user in [user1, user2]:
            for race_event in race_event_objects:
                # Check if the user has already signed up for the race event
                existing_signup = RaceSignup.query.filter_by(user_id=user.id, race_event_id=race_event.id).first()
                if existing_signup:
                    print(f"User {user.id} has already signed up for race event {race_event.id}. Skipping...")
                else:
                    # Create a RaceSignup instance for the user and race event
                    race_signup = RaceSignup(waiver_accept=True, tshirt_size="S", coupon_code="DEF456", user=user, race_event=race_event)
                    db.session.add(race_signup)

        # Commit the changes to the database
        db.session.commit()
