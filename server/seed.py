from app.app_factory import app
from app.models import User, db
from faker import Faker
import random
from random import randint, choice as rc
fake = Faker()
with app.app_context():
    User.query.delete()

    print("🦸‍♀️ Seeding users...")

    users_images = [
        "img1",
        "img2",
        "img3",
        "img4",
        "img5",
        "img6",
        "img7",
        "img8",
        "img9",
        "img10",
        "img11",
        "img12"
    ]

    for i in range(20):
        new_user = User(
            username=f'{fake.unique.first_name()}{fake.unique.last_name()}',
            profile_pic=f'/{rc(users_images)}'
        )
        new_user.email = f'{new_user.username}@mail.com'
        db.session.add(new_user)
    db.session.commit()

    print("🦸‍♀️ Seeding complete!")
#

