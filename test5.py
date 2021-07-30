import json
from loguru import logger

test = []

with open('groups_output.json') as t:
    test = json.load(t)

tg = test['grouped']
tgn = tg['nodes']
tgl = tg['links']
tgg = tg['groups']


logger.debug('===============================')

logger.debug(f'outlist is {test}')

with open('outnodes.json', 'w') as json_file:
  json.dump(tgn, json_file)

with open('outlinks.json', 'w') as json_file:
  json.dump(tgl, json_file)

with open('outgroups.json', 'w') as json_file:
  json.dump(tgg, json_file)