from datetime import datetime
from flask import render_template, request, flash, redirect, url_for, session
from flask_login import login_user, current_user, login_required, logout_user
from loguru import logger
import json

from . import g_project_blueprint
from .forms import ConnectionForm
from project.g_project.colour_list import colour_list
from project.models import User, Connection
from project.g_project.G_to_WebCola import get_data as gquery
from . import WebCola_Groups3 as g
from . import Collapse_Group as c


################
#### routes ####
################

@g_project_blueprint.route('/connect', methods=['get', 'post'])
@login_required
def g_connect():
    if not current_user.is_authenticated:
        flash('Please login!  Redirecting to Login page...')
        return redirect(url_for('users.login'))

    form = ConnectionForm()

    if request.method == 'POST':
        logger.debug('==================================')
        logger.debug(f'form is -> {form}')
        if form.validate_on_submit():
            # setup grakn connecction dict
            logger.debug('made it internal')
            gConnect = {}
            gConnect['url'] = form.server.data
            gConnect['port'] = form.port.data
            gConnect['database'] = form.database.data
            gConnect['gQuery'] = form.query.data
            # query grakn
            logger.debug(f' the gconnect is {gConnect}')
            colaGraph = gquery(gConnect=gConnect)
            logger.debug(f'{colaGraph}')
            session['COLOUR'] = colour_list
            session['COLAGRAPH'] = colaGraph
            # return the template and data
            return redirect('/visualise')
            
    return render_template('g_project/g_connect.html', form=form, gConnect=g.def_gConnect)

@g_project_blueprint.route('/visualise', methods=['get', 'post'])
@login_required
def g_visualise():
    colour_list = session['COLOUR']
    colaGraph = session['COLAGRAPH']
    theme = session["THEME"]
    return render_template('g_project/g_viz2.html', colagraph=colaGraph, colorlist=colour_list, theme=theme, gConnect=g.def_gConnect)


@g_project_blueprint.route('/group', methods=['get', 'post'])
@login_required
def g_group():
    colour_list = session['COLOUR']
    colaGraph = session['COLAGRAPH']
    theme = session["THEME"]    
    return render_template('g_project/temp3.html', colagraph=colaGraph, colorlist=colour_list, theme=theme, gConnect=g.def_gConnect)

@g_project_blueprint.route('/get_group', methods=['get', 'post'])
@login_required
def get_g_group():
    # on Get, then unpack params
    if(request.data):
        logger.debug('=============== Grouping Inputs ======================')
        logger.debug(f'{request}')
        args = request.args
        newargs = request.get_json()
        logger.debug(f'newargs are {newargs} ')
        logger.debug(f'my args are {args}')
        jargs = json.loads(newargs)
        logger.debug(f'my jargs are {jargs}')
        colaGraph = jargs
        defined_list = jargs['defined_list']
        #logger.debug(colaGraph)
        logger.debug(defined_list)
        logger.debug('=========== End of Grouping Inputs =============')
        
        #logger.debug(f'the json loaded {jargs}')
        #logger.debug(f'args value is --> {jargs}')
        
        with open("groups_web_test.json", "w") as outfile:  
            json.dump(jargs, outfile) 

        # put data access stuff here
        colaGraph = g.group_Grakn(colaGraph, defined_list)
        # nodes, edges, G_types = gq.get_data(gqConnect)
        # as dummy, import nodes and edges
        session['COLAGRAPH'] = colaGraph    
        logger.debug(f'baseGraph value is --> {colaGraph}')
        return (json.dumps(colaGraph))
    else:
        return 'nothing'

@g_project_blueprint.route('/get_collapsed', methods=['get', 'post'])
@login_required
@logger.catch
def get_collapsed():
    # on Get, then unpack params
    if(request.data):
        logger.debug('===============inside collapse ======================')
        logger.debug(f'request is -> {request}')
        args = request.args
        newargs = request.get_json()
        logger.debug(f'newargs are {newargs} ')
        logger.debug(f'my args are {args}')
        jargs = json.loads(newargs)
        logger.debug('========================')
        logger.debug(jargs)
        #logger.debug(f'the json loaded {jargs}')
        #logger.debug(f'args value is --> {jargs}')
        colaGraph = jargs
        group_name = jargs['collapse_label']
        logger.debug(colaGraph)
        logger.debug(group_name)
        with open("collapsed_inputs.json", "w") as outfile:  
            json.dump(jargs, outfile) 

        # put data access stuff here
        collapsed = c.collapse(colaGraph, group_name)
        # nodes, edges, G_types = gq.get_data(gqConnect)
        # as dummy, import nodes and edges
        with open("collapsed_outputs.json", "w") as outfile:  
            json.dump(collapsed, outfile) 
        #logger.debug(f'collapsed value is --> {collapsed}')
        return (json.dumps(collapsed))
    else:
        return 'nothing'

    

