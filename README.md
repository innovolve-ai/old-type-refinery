# GRAKN_REFINERY2

## Run in docker

```powershell
docker compose up
```

Open the browser and navigate to http://localhost:8080/ to view the site.

Open the browser and navigate to http://localhost:8081/ to view the mongo database.

## Installation

First pull repo into a directory

Install Pipenv

```bash
pip install pipenv Flask asdf
```

Then setup python virtual env

```bash
pipenv shell
```

then install dependencies with

```bash
pipenv install
```

then after everything installed

```bash
export FLASK_APP=refinery.py
flask run --host=0.0.0.0
```

then access `localhost\login` to access the webpage.


## Testing TypeDB Connection and Basic Dataset

Make sure TypeDB is running on localhost, with pm_4 logs loaded

The input data for this test is input_test1_connection.json

To run the test, run
```python examples\z_test1_tdb_query.py```

The test will produce an output json that contains the basic dataset. Note all algorithms independently produce output, and sometimes input jsons

## Testing TypeDB Grouping and Grouped Dataset

Make sure TypeDB is running on localhost, with pm_4 logs loaded

The input data for this test is input_test2_colaGraph_sample.json, which contains the sample Basic dataset, and input_test2_definition.json which contains the group definitions for 3 nested groups

To run the test, run
```python examples\z_test2_Grouping.py```

The test will produce an output json. Note all algorithms independently produce output, and sometimes input jsons

## Testing TypeDB Group Collapse and Collapsed Dataset

Make sure TypeDB is running on localhost, with pm_4 logs loaded

The input data for this test is input_test3_Grouped.json, which contains the sample Grouped dataset, and a string that contains one of the group names, in this case "session"

To run the test, run
```python examples\z_test3_Collapsing.py```

The test will produce an output json. Note all algorithms independently produce output, and sometimes input jsons
