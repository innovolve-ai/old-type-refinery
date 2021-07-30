import json
from loguru import logger
from project.g_project.Collapse_Group import collapse


with open('groups_output.json') as t:
    test = json.load(t)

collapsed = collapse(test, "trace session")

logger.debug('===============================')


with open('collapsed.json', 'w') as json_file:
  json.dump(collapsed, json_file)