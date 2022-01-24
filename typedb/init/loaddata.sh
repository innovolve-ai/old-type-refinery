#! /bin/bash

if [[ ! -f "./typedb/data/${TYPEDB_DB}/.loaddata" ]]; then
    echo "Loading data..."

    pip install pipenv Flask asdf
    pipenv install
    pipenv run python ./typedb/init/basic_upload.py

    touch ./typedb/data/${TYPEDB_DB}/.loaddata

fi 

