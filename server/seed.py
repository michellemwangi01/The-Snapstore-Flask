from app.app_factory import app, uuid
from app.models import User, Category, Photo, Transaction, Cart, CartItem, db
from faker import Faker
import random, locale
from random import randint, choice as rc

fake = Faker()
with app.app_context():
    User.query.delete()
    Category.query.delete()
    Photo.query.delete()
    Transaction.query.delete()
    Cart.query.delete()
    CartItem.query.delete()

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
            profile_pic=f'/{rc(users_images)}',
            public_id = str(uuid.uuid4())

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

    print("🦸‍♀️ Seeding carts, cart items, and transactions...")

    for _ in range(5):
        # Create a cart for a random user
        user_id = random.choice(user_ids)
        cart = Cart(user_id=user_id)
        db.session.add(cart)
        db.session.commit()

        for _ in range(5):
            while True:
                # Create a cart item for a random photo in the cart
                photo_id = random.choice(photo_ids)
                cart_item = CartItem(
                    cart=cart,
                    photo_id=photo_id,
                    quantity=random.randint(1, 5),
                )
                db.session.add(cart_item)
                db.session.commit()

                # Check if the user is trying to buy their own photo
                if Photo.query.get(photo_id).user_id == user_id:
                    print(f"User {user_id} tried to buy their own photo. Retrying...")
                    db.session.rollback()
                else:
                    break

            # Create a transaction for the cart item
            transaction = Transaction(
                cart_item=cart_item,
                user_id=user_id,
            )
            db.session.add(transaction)
            db.session.commit()
            print(f"Transaction successful: User {user_id} bought a photo.")

    print("🦸‍♀️ Seeding complete!")

    print("🦸‍♀️ Seeding complete!")


# transaction_user_schema = api.model('transaction',{
#     "id": fields.Integer,
#     "quantity": fields.Integer,
#     "amount": fields.Integer,
# })