from flask import Flask
from config import Config
from app.extensions import db, migrate, jwt, login_manager

from app.tweet import tweetBp
from app.user import userBp
from app.auth import authBp
from app.frontend import frontendBp
from app.scheduler import countBp

from datetime import timedelta

#import models
from app.models.user import Users
from app.models.tweet import Tweets
from app.models.count_tweet import CountTweets

#import flask admin
from flask_admin import Admin

#import mymodelview
from app.admin.MyCustomModel import CustomModelView, HomeAdminView


# import schedule
import schedule
import time
import threading

# from flask_admin.contrib.sqla import ModelView
def create_app(config_class=Config):
    # Konfigurasi APP
    app = Flask(__name__)
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
    app.config.from_object(config_class)

    #Buat instnce flask admin
    admin = Admin(name="Admin Panel", template_mode="bootstrap4", index_view=HomeAdminView("home"), url='/')
    # admin = Admin(name="Admin Panel", template_mode="bootstrap4")

    # Initilizae database & migration
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    admin.init_app(app)
    login_manager.init_app(app)

    #init login user
    @login_manager.user_loader
    def load_user(user_id):
        return Users.query.get(int(user_id))

    # inisiasi periodic task
    def schedule_count_tweets():
        with app.app_context():
            from app.scheduler.postCount import count_tweet
            count_tweet()
            print("Count Tweet Task is Running !")
            # Create the scheduler

    # inisiasi periodic task
    def schedule_update_link():
        with app.app_context():
            from app.scheduler.upadeUrl import updated_link
            updated_link()
            print("Update URL Image Task is Running !")
    
    schedule.every(60).seconds.do(schedule_count_tweets)
    schedule.every(30).seconds.do(schedule_update_link)
    # Start the scheduler in a separate thread
    def run_scheduler():
        while True:
            schedule.run_pending()
            time.sleep(1)

    scheduler_thread = threading.Thread(target=run_scheduler)
    scheduler_thread.daemon = True
    scheduler_thread.start()
    
    # inisiasi admin 
    admin.add_view(CustomModelView(Users, db.session))
    admin.add_view(CustomModelView(Tweets, db.session))
    admin.add_view(CustomModelView(CountTweets, db.session))

    # initilize blueprint
    app.register_blueprint(frontendBp, url_prefix='/')
    app.register_blueprint(countBp, url_prefix='/api/counts')
    app.register_blueprint(tweetBp, url_prefix='/api/tweets')
    app.register_blueprint(userBp, url_prefix='/api/users')
    app.register_blueprint(authBp, url_prefix='/api/auth')

    return app