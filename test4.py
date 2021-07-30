import json
from loguru import logger

test = []

with open('groups_output.json') as t:
    test2 = json.load(t)

test = test2['grouped']['nodes']
logger.debug(f'test is {test}')
outlist = []

for tes in test:
    out = {}
    if 'leaves' in tes:
        out['leaves'] = tes['leaves']

    if 'groups' in tes:
        out['groups'] = tes['groups']
    
    
    if 'label' in tes:
        out['label'] = tes['label']

    outlist.append(out)

logger.debug('===============================')

logger.debug(f'outlist is {outlist}')

with open('outnodes.json', 'w') as json_file:
  json.dump(test, json_file)