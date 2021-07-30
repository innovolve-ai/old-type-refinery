import os
basedir = os.path.abspath(os.path.dirname(__file__))

#from helper.helper_functions import generate_secret_key

class Config:
    SECRET_KEY = '\xfd{H\xe5<\x95\xf9\xe3\x96.5\xd1\x01O<!\xd5\xa2\xa0\x9fR"\xa1\xa8'
    SSL_DISABLE = False

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    MONGODB_SETTINGS = {
        'DB': 'grakn',
        'host': 'localhost',
        'port': 27017,
        'alias': "default"
    }


class TestingConfig(Config):
    TESTING = True
    WTF_CSRF_ENABLED = False
    MONGODB_SETTINGS = {
        'DB': 'grakn',
        'HOST': 'localhost',
        'PORT': 27017,
        'alias': "default"
    }


class ProductionConfig(Config):
    MONGODB_SETTINGS = {
        'DB': 'grakn',
        'host': 'server_ip',
        'port': 27017,
        'alias': "default"       # default =27017
        # other settings...
    }

    @classmethod
    def init_app(app):
        Config.init_app(app)

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': TestingConfig,
}