from flask import Flask
from flask_mongoengine import MongoEngine, MongoEngineSessionInterface
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from config import *



#######################
#### Configuration ####
#######################

# Create the instances of the Flask extensions (flask-sqlalchemy, flask-login, etc.) in
# the global scope, but without any arguments passed in.  These instances are not attached
# to the application at this point.

db = MongoEngine()
bcrypt = Bcrypt()
login = LoginManager()
login.login_view = "users.login"


######################################
#### Application Factory Function ####
######################################

def create_app(config_filename=None):
    if config_filename == None:
        config_filename = "config.DevelopmentConfig"
        
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(config_filename)
    initialize_extensions(app)
    register_blueprints(app)
    CORS(app)
    return app


##########################
#### Helper Functions ####
##########################

def initialize_extensions(app):
    # Since the application instance is now created, pass it to each Flask
    # extension instance to bind it to the Flask application instance (app)
    db.init_app(app)
    bcrypt.init_app(app)
    login.init_app(app)
    app.session_interface = MongoEngineSessionInterface(db)

    # Flask-Login configuration
    from project.models import User

    @login.user_loader
    def load_user(user_id):
        return User.objects(pk=user_id).first()


def register_blueprints(app):
    # Since the application instance is now created, register each Blueprint
    # with the Flask application instance (app)
    from project.g_project import g_project_blueprint
    from project.users import users_blueprint

    app.register_blueprint(g_project_blueprint)
    app.register_blueprint(users_blueprint)
