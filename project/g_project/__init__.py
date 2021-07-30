"""
The g_product Blueprint handles the Grakn analysis project lifecycle.
Specifically, this Blueprint allows for new users to connect to Grakn servers,
query them, and customise layouts

"""
from flask import Blueprint
g_project_blueprint = Blueprint('g_project', __name__, template_folder='templates')

from . import routes