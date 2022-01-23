from project import create_app
from config import *
import os

envtype = os.environ.get('ENV_TYPE')

# Call the application factory function to construct a Flask application
# instance using the development configuration
if envtype == 'docker':
    app = create_app('config.DockerConfig')
else:
    app = create_app('config.DevelopmentConfig')