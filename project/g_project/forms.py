from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField, TextAreaField
from wtforms.validators import DataRequired, Length, EqualTo, Email, ValidationError
from project.models import User


class ConnectionForm(FlaskForm):
    description = StringField('Description', validators=[DataRequired(), Length(min=6, max=100)], default='test connection')
    server = StringField('Server', validators=[DataRequired(), Length(min=4, max=100)], default='localhost')
    port = StringField('Port', validators=[DataRequired(), Length(min=3, max=100)], default='1729')
    database = StringField('Database', validators=[DataRequired(), Length(min=2, max=100)], default='pm_4')
    query = TextAreaField('Graql Query', validators=[DataRequired()])
        
    submit = SubmitField('Load GQuery')

    


