from datetime import datetime
from flask import render_template, request, flash, redirect, url_for, session
from flask_login import login_user, current_user, login_required, logout_user

from . import users_blueprint
from .forms import RegisterForm, LoginForm
from project.models import User
from project import db, bcrypt
from project.g_project import routes
from loguru import logger
from project.users import theme_base as t
import os

def_gConnect = {
        "url": os.environ.get('TYPEDB_HOST', 'localhost'),
        "port": os.environ.get('TYPEDB_PORT', '1729'),
        "database": os.environ.get('TYPEDB_DB', 'pm_4'),
        "gQuery": ""
      }

################
#### routes ####
################

@users_blueprint.route('/profile')
@login_required
def profile():
    return render_template('users/profile.html', gConnect=def_gConnect)


@users_blueprint.route('/register', methods=['GET', 'POST'])
def register():
    # If the User is already logged in, don't allow them to try to register
    if current_user.is_authenticated:
        flash('Already registered!  Redirecting to your User Profile page...')
        return redirect(url_for('users.profile'))

    form = RegisterForm()
    if request.method == 'POST' and form.validate_on_submit():
        hash_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        new_user = User(email=form.email.data, hashed_password=hash_password, created_at = datetime.now()).save()
        login_user(new_user)
        session["USERNAME"] = new_user["email"]
        flash('Thanks for registering, {}!'.format(new_user.email))
        return redirect(url_for('users.profile'))
    return render_template('users/register.html', form=form, gConnect=def_gConnect)


@users_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    # If the User is already logged in, don't allow them to try to log in again
    if current_user.is_authenticated:
        flash('Already logged in!  Redirecting to your User Profile page...')
        return redirect(url_for('g_project.g_connect'))

    form = LoginForm()

    if request.method == 'POST':
        if form.validate_on_submit():
            user = User.objects(email=form.email.data).first()
            if user and user.is_correct_password(form.password.data):
                login_user(user, remember=form.remember_me.data)
                session["USERNAME"] = form.email.data
                #logger.debug(f'session theme -> {form.theme.data}')                
                session["THEME_NAME"] = form.theme.data
                session["THEME"] = t.themes[form.theme.data]
                flash('Thanks for logging in, {}!'.format(current_user.email))
                return redirect(url_for('users.profile'))

        flash('ERROR! Incorrect login credentials.')
    return render_template('users/login.html', form=form, gConnect=def_gConnect)


@users_blueprint.route('/logout')
@login_required
def logout():
    logout_user()
    session.pop("USERNAME", None)
    flash('Goodbye!')
    return redirect(url_for('users.login'))
