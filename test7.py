import json
from loguru import logger



with open('collapsed_outputs.json') as t:
    test = json.load(t)
local_stations = []
localnodes = test['nodes']
for ln in localnodes:
    if (ln['G_name'] == 'station'):
        local_stations.append(ln)



with open('stations.json', 'w') as json_file:
  json.dump(local_stations, json_file)