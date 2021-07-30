from project.g_project import WebCola_Groups2 as g
import json
from loguru import logger


@logger.catch
def main():

    # load in json
    with open('groups_output.json') as json_file:
        data = json.load(json_file)

    local_definitions = data['defined_list']

    

    logger.debug('==============================')
    logger.debug(data)
    logger.debug(local_definitions)
    logger.debug('==============================')       

    
    with open("test_definition.json", "w") as outfile:  
        json.dump(local_definitions, outfile) 

    for index, local_def in enumerate(local_definitions):
        fname = f'definition{index}.json'
        logger.debug(f'fname is {fname}')
        with open(fname, "w") as outfile:  
            json.dump(local_def, outfile) 




if __name__ == '__main__':
    main()