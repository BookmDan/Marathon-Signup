from config import app, db
from app import db, PomAd, User

if __name__ == "__main__":
  with app.app_context():
    # remove pass and write your seed data
    pom_ads = []
    user1 = User.query.filter_by(username='user1').first()
    user2 = User.query.filter_by(username='user2').first()

    # Add some PomAd instances to the list
    pom_ads.append(PomAd(user_id=user1.id, title="Cute male pomeranian puppy", description="Description 1"))
    pom_ads.append(PomAd(user_id=user2.id, title="AKC pomeranians", description="Description 2"))
    pom_ads.append(PomAd(user_id=user1.id, title="female pomeranian", description="Description 3"))
    pom_ads.append(PomAd(user_id=user2.id, title="merle male pomeranian", description="Description 4"))

    # Insert each PomAd in the list into the database table
    db.session.add_all(pom_ads)

    # Commit the transaction
    db.session.commit()
