from config import app, db
from models.models import User, RaceSignup, RaceEvent, CreditCardInfo,ShoppingCart
import random

if __name__ == "__main__":
    with app.app_context():
        # Clear existing data
        db.session.query(User).delete()
        db.session.query(RaceSignup).delete()
        db.session.query(RaceEvent).delete()
        db.session.query(CreditCardInfo).delete()
        # db.session.query(Results).delete()
        db.session.query(ShoppingCart).delete()
        db.session.commit()

        # Create users
        user1 = User(first_name="John", last_name="Doe", email="john@example.com", phone_number="1234567890",estimated_finish_time=3600, )
        user2 = User(first_name="Jane", last_name="Doe", email="jane@example.com", phone_number="9876543210", estimated_finish_time=3600,)
        user1.password_hash = "12341234"
        user2.password_hash = "13241324"
        db.session.add_all([user1, user2])
        db.session.commit()

        athletes_data = [
            {"full_name": "Joahn Doe", "gender": "Male", "age": 30, "city": "New York", "state": "NY", "run_time": "1:30:00", "race_place": 1, "gender_place": 1},
            {"full_name": "Jane Smith", "gender": "Female", "age": 35, "city": "Los Angeles", "state": "CA", "run_time": "1:35:00", "race_place": 2, "gender_place": 1},
        ]
        for idx, data in enumerate(athletes_data, start=1):
        # Calculate age group
            if 20 <= data["age"] <= 29:
                age_group = "20-29"
            elif 30 <= data["age"] <= 39:
                age_group = "30-39"
            else:
                age_group = "40+"

            # Calculate overall pace (assuming 10k race)
            total_seconds = sum(int(x) * 60 ** i for i, x in enumerate(reversed(data["run_time"].split(":"))))
            overall_pace_seconds = total_seconds / 10  # 10k race distance
            overall_pace_minutes, overall_pace_seconds = divmod(overall_pace_seconds, 60)
            overall_pace = f"{int(overall_pace_minutes)}:{int(overall_pace_seconds)}"

            # Calculate age place (assuming 10 athletes)
            age_place = idx

        # # Commit changes to the database
        # db.session.commit()
        # coupon_code='ABC123', ship_packet_cost=5.00,
            # ship_packet_cost=7.00,coupon_code='DEF456'
        shopping_cart1 = ShoppingCart(race_cost=50.00,  cart_items=3, tshirt_size='M')
        shopping_cart2 = ShoppingCart(race_cost=60.00,  cart_items=2, tshirt_size='L' )

        db.session.add_all([shopping_cart1, shopping_cart2])
        db.session.commit()

        # Create race events
        race_events_data = [
            {"race_name": "Better Half", "organization": "BigHearts", "race_type": "5k", "start_time": "8:00 AM",
            "start_day": "2024-07-15", "packetpickup_day": "2024-07-13", "packetpickup_location": "123 Main St, City, State",
            "location": "Seattle", "race_cost": 50.00},
            {"race_name": "Better Half", "organization": "BigHearts", "race_type": "10k", "start_time": "9:00 AM",
            "start_day": "2024-07-15", "packetpickup_day": "2024-07-13", "packetpickup_location": "123 Main St, City, State",
            "location": "Bellevue", "race_cost": 60.00},
            {"race_name": "Better Half", "organization": "BigHearts", "race_type": "Half Marathon", "start_time": "10:00 AM",
            "start_day": "2024-07-15", "packetpickup_day": "2024-07-13", "packetpickup_location": "123 Main St, City, State",
            "location": "456 Elm St, City, State", "race_cost": 70.00},
            {"race_name": "Better Half", "organization": "BigHearts", "race_type": "Full Marathon", "start_time": "11:00 AM",
            "start_day": "2024-07-15", "packetpickup_day": "2024-07-13", "packetpickup_location": "123 Main St, City, State",
            "location": "456 Elm St, City, State", "race_cost": 80.00},
            {"race_name": "Orca 3000", "organization": "10000Runs", "race_type": "5k", "start_time": "8:30 AM",
            "start_day": "2024-07-20", "packetpickup_day": "2024-07-18", "packetpickup_location": "456 Oak St, City, State",
            "location": "789 Pine St, City, State", "race_cost": 50.00},
            {"race_name": "Orca 3000", "organization": "10000Runs", "race_type": "10k", "start_time": "9:30 AM",
            "start_day": "2024-07-20", "packetpickup_day": "2024-07-18", "packetpickup_location": "456 Oak St, City, State",
            "location": "789 Pine St, City, State", "race_cost": 60.00},
            {"race_name": "Orca 3000", "organization": "10000Runs", "race_type": "Half Marathon", "start_time": "10:30 AM",
            "start_day": "2024-07-20", "packetpickup_day": "2024-07-18", "packetpickup_location": "456 Oak St, City, State",
            "location": "789 Pine St, City, State", "race_cost": 70.00},
            {"race_name": "Orca 3000", "organization": "10000Runs", "race_type": "Full Marathon", "start_time": "11:30 AM",
            "start_day": "2024-07-20", "packetpickup_day": "2024-07-18", "packetpickup_location": "456 Oak St, City, State",
            "location": "789 Pine St, City, State", "race_cost": 80.00},
            # Add other race events with their respective race costs
            {"race_name": "Crazy Dash", "organization": "FunRuns", "race_type": "5k", "start_time": "9:00 AM",
            "start_day": "2024-07-25", "packetpickup_day": "2024-07-23", "packetpickup_location": "789 Maple St, City, State",
            "location": "123 Oak St, City, State", "race_cost": 50.00},
            {"race_name": "Crazy Dash", "organization": "FunRuns", "race_type": "10k", "start_time": "10:00 AM",
            "start_day": "2024-07-25", "packetpickup_day": "2024-07-23", "packetpickup_location": "789 Maple St, City, State",
            "location": "123 Oak St, City, State", "race_cost": 60.00},
            {"race_name": "Crazy Dash", "organization": "FunRuns", "race_type": "Half Marathon", "start_time": "11:00 AM",
            "start_day": "2024-07-25", "packetpickup_day": "2024-07-23", "packetpickup_location": "789 Maple St, City, State",
            "location": "123 Oak St, City, State", "race_cost": 70.00},
            {"race_name": "Crazy Dash", "organization": "FunRuns", "race_type": "Full Marathon", "start_time": "12:00 PM",
            "start_day": "2024-07-25", "packetpickup_day": "2024-07-23", "packetpickup_location": "789 Maple St, City, State",
            "location": "123 Oak St, City, State", "race_cost": 80.00},
            {"race_name": "Mud Madness", "organization": "ExtremeEvents", "race_type": "5k", "start_time": "8:00 AM",
            "start_day": "2024-07-30", "packetpickup_day": "2024-07-28", "packetpickup_location": "456 Pine St, City, State",
            "location": "789 Elm St, City, State", "race_cost": 50.00},
            {"race_name": "Mud Madness", "organization": "ExtremeEvents", "race_type": "10k", "start_time": "9:00 AM",
            "start_day": "2024-07-30", "packetpickup_day": "2024-07-28", "packetpickup_location": "456 Pine St, City, State",
            "location": "789 Elm St, City, State", "race_cost": 60.00},
            {"race_name": "Mud Madness", "organization": "ExtremeEvents", "race_type": "Half Marathon", "start_time": "10:00 AM",
            "start_day": "2024-07-30", "packetpickup_day": "2024-07-28", "packetpickup_location": "456 Pine St, City, State",
            "location": "789 Elm St, City, State", "race_cost": 70.00},
            {"race_name": "Mud Madness", "organization": "ExtremeEvents", "race_type": "Full Marathon", "start_time": "11:00 AM",
            "start_day": "2024-07-30", "packetpickup_day": "2024-07-28", "packetpickup_location": "456 Pine St, City, State",
            "location": "789 Elm St, City, State", "race_cost": 80.00},
            # Add other race events with their respective race costs
            {"race_name": "Color Run", "organization": "HappyFeet", "race_type": "5k", "start_time": "8:30 AM",
            "start_day": "2024-08-05", "packetpickup_day": "2024-08-03", "packetpickup_location": "789 Oak St, City, State",
            "location": "123 Maple St, City, State", "race_cost": 50.00},
            {"race_name": "Color Run", "organization": "HappyFeet", "race_type": "10k", "start_time": "9:30 AM",
            "start_day": "2024-08-05", "packetpickup_day": "2024-08-03", "packetpickup_location": "789 Oak St, City, State",
            "location": "123 Maple St, City, State", "race_cost": 60.00},
            {"race_name": "Color Run", "organization": "HappyFeet", "race_type": "Half Marathon", "start_time": "10:30 AM",
            "start_day": "2024-08-05", "packetpickup_day": "2024-08-03", "packetpickup_location": "789 Oak St, City, State",
            "location": "123 Maple St, City, State", "race_cost": 70.00},
            {"race_name": "Color Run", "organization": "HappyFeet", "race_type": "Full Marathon", "start_time": "11:30 AM",
            "start_day": "2024-08-05", "packetpickup_day": "2024-08-03", "packetpickup_location": "789 Oak St, City, State",
            "location": "123 Maple St, City, State", "race_cost": 80.00},
        ]

        race_event_objects = []
        for race_event_data in race_events_data:
            race_event = RaceEvent(**race_event_data)
            race_event.ratings = str(random.randint(1, 5))
            race_event_objects.append(race_event)

        db.session.add_all(race_event_objects)
        db.session.commit()


        # Create credit card information
        credit_card1 = CreditCardInfo( credit_card_number="1234567890123456", name_on_card="John Doe", expiration_date="12/25", cvv="123", street_address="789 Elm St", country="US", zipcode="67890", city="Villagetown", state="VT", save_my_card=True)
        credit_card2 = CreditCardInfo(credit_card_number="9876543210987654", name_on_card="Jane Doe", expiration_date="06/23", cvv="456", street_address="321 Pine St", country="US", zipcode="54321", city="Towndale", state="TS", save_my_card=False)
        db.session.add_all([credit_card1, credit_card2])
        db.session.commit()

        race_event1 = race_event_objects[0]
        race_event2 = race_event_objects[1]

        for user in [user1, user2]:
            for race_event in race_event_objects:
                # Check if the user has already signed up for the race event
                existing_signup = RaceSignup.query.filter_by(user_id=user.id, race_event_id=race_event.id).first()
                if existing_signup:
                    print(f"User {user.id} has already signed up for race event {race_event.id}. Skipping...")
                else:
                    race_signup = RaceSignup(
                        user_id = user.id,
                        race_event_id=race_event.id,
                        waiver_accept=True, 
                        tshirt_size="S")
                        # coupon_code="DEF456", 
                        # ship_packet=True, 
                    db.session.add(race_signup)

        # Commit the changes to the database
        db.session.commit()
