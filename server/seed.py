#!/usr/bin/env python3

from faker import Faker
from app import app, db
from models import User, Pom, PomAd, AdoptionRequest

fake = Faker()

def create_fake_user():
    return User(
        username=fake.user_name(),
        email=fake.email(),
        password=fake.password(),
        address_line1=fake.street_address(),
        address_line2=fake.secondary_address(),
        city=fake.city(),
        state=fake.state(),
        postal_code=fake.zipcode(),
    )

def create_fake_pom():
    return Pom(
        name=fake.word(),
        age=fake.random_int(min=1, max=10),
        color=fake.color_name(),
        description=fake.text(),
    )

def create_fake_pomad(user, pom):
    return PomAd(
        user=user,
        pom=pom,
        title=fake.sentence(),
        description=fake.paragraph(),
    )

def create_fake_adoption_request(user, pom):
    return AdoptionRequest(
        user=user,
        pom=pom,
        adopter_name=fake.name(),
        email=fake.email(),
    )

if __name__ == '__main__':
    with app.app_context():
        # Create fake users
        users = [create_fake_user() for _ in range(5)]
        db.session.add_all(users)
        db.session.commit()

        # Create fake poms
        poms = [create_fake_pom() for _ in range(10)]
        db.session.add_all(poms)
        db.session.commit()

        # Create fake pomads and adoption requests
        for user in users:
            for pom in poms:
                if fake.boolean(chance_of_getting_true=30):  # 30% chance of creating a PomAd and AdoptionRequest
                    pomad = create_fake_pomad(user, pom)
                    adoption_request = create_fake_adoption_request(user, pom)
                    db.session.add_all([pomad, adoption_request])

        db.session.commit()
