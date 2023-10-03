from app.app_factory import app
from app.models import User, Category, Photo, Transaction, db
from faker import Faker
import random, locale
from random import randint, choice as rc

fake = Faker()
with app.app_context():
    User.query.delete()
    Category.query.delete()
    Photo.query.delete()
    Transaction.query.delete()

    users_images = [
        "/img1",
        "/img2",
        "/img3",
        "/img4",
        "/img5",
        "/img6",
        "/img7",
        "/img8",
        "/img9",
        "/img10",
        "/img11",
        "/img12"
    ]

    categories = [
        'Animals',
        'Landscapes',
        'Food and Drink',
        'People and Portraits',
        'Travel and Tourism',
        'Sports and Athletics',
        'Fashion and Clothing',
        'Technology and Gadgets',
        'Nature and Wildlife',
        'Art and Creativity'
    ]

    print("🦸‍♀️ Seeding users...")
    user_ids = []
    for i in range(20):
        new_user = User(
            username=f'{fake.unique.first_name()}{fake.unique.last_name()}',
            profile_pic=f'/{rc(users_images)}'
        )
        new_user.email = f'{new_user.username}@mail.com'
        db.session.add(new_user)
        db.session.commit()
        user_ids.append(new_user.id)

    print("🦸‍♀️ Seeding categories...")
    category_ids = []
    for i in range(len(categories)):
        new_category = Category(
            name=categories[i],
        )
        db.session.add(new_category)
        db.session.commit()
        category_ids.append(new_category.id)

    print("🦸‍♀️ Seeding photos...")
    photo_ids = []
    locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')
    for i in range(len(users_images)):
        new_photo = Photo(
            name=fake.unique.word(),
            description=fake.unique.sentence(),
            price = round(random.uniform(1000.00, 10000.00), 2),
            user_id=rc(user_ids),
            category_id=rc(category_ids),
            image=rc(users_images)
        )
        db.session.add(new_photo)
        db.session.commit()
        photo_ids.append(new_photo.id)

    print("🦸‍♀️ Seeding transactions...")
    for i in range(30):
        qty = random.randint(1,10)
        new_transaction = Transaction(
            photo_id=rc(photo_ids),
            quantity=qty,
            amount= qty*random.randint(1,8),
            user_id=rc(user_ids),
        )
        db.session.add(new_transaction)
        db.session.commit()


    print("🦸‍♀️ Seeding complete!")


