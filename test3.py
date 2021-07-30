from project.g_project import WebCola_Groups2 as g
import json
from loguru import logger

def make_report(data):
    report_layer = {}
    report_layer['nodes'] = len(data['nodes'])
    report_layer['links'] = len(data['links'])
    report_layer['groups'] = len(data['groups'])    
    return report_layer

def make_collapsed_report(data):
    loc_nodes = data['nodes']
    loc_links = data['links']
    loc_groups = data['groups']
    loc_super = data['super']
    logger.debug('=====================================')
    logger.debug(f'loc_super is -> {loc_super}')
    logger.debug('=====================================')
    report_layer = {}
    logger.debug(data)
    report_layer['nodes'] = len(data['nodes'])
    report_layer['links'] = len(data['links'])
    report_layer['groups'] = len(data['groups'])   
    superg =  data['super']
    logger.debug(f'superg is {superg}')
    data_records = []
    for key in superg:
        logger.debug(f'key is  {key}')
        local_layer = superg[key]
        super_layer = {}
        super_layer['key'] = key
        super_layer['nodes'] = len(local_layer['nodes'])
        super_layer['links'] = len(local_layer['links'])
        super_layer['groups'] = len(local_layer['groups'])
        data_records.append(super_layer)

    report_layer['super'] = data_records
        


    return report_layer




@logger.catch
def main():

    # load in json
    with open('groups_output.json') as json_file:
        data = json.load(json_file)

    with open('collapsed.json') as collapse_json:
        collapsed = json.load(collapse_json)

    report_list = []

    data_rep = make_collapsed_report(collapsed)
    proper_rep = make_report(data['grouped'])

    # logger.debug(collapsed)   

    logger.debug('==============================||||============================')
    logger.debug('Basic Group Lengths')
    logger.debug(f'Original Nodes -> {proper_rep["nodes"]},              Output Nodes -> {data_rep["nodes"]}')
    logger.debug(f'Original Links -> {proper_rep["links"]},              Output links -> {data_rep["links"]}')
    logger.debug(f'Original Groups -> {proper_rep["groups"]},              Output groups -> {data_rep["groups"]}')
    logger.debug('============================== ||||| ===============================')     
    superg = data_rep['super']  
    for key in superg:
        logger.debug(f'key is {key}, superg is {list(superg)}')
        sg=superg[key]
        logger.debug(f'Group Key -> {key},              Output links -> {sg["links"]}')
        logger.debug(f'Output Nodes -> {proper_rep["nodes"]},              Output groups -> {data_rep["groups"]}')
        logger.debug('----------------------------------------------------------------------------------------------')
    

    
   




if __name__ == '__main__':
    main()