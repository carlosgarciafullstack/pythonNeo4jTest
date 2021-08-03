# pythonNeo4jTest
Angular, Python, Neo4j

# Angular
https://dev.to/arielmirra/como-actualizar-angular-cli-de-forma-rapida-y-eficiente-3kb9

```
PythonTest\pythonNeo4jTest\Frontend\angularTest> ng serve

```

# Python
https://www.python.org/downloads/
https://flask.palletsprojects.com/en/2.0.x/installation/#install-flask

```
 PythonTest\pythonNeo4jTest\Backend> py -3 -m venv venv
 PythonTest\pythonNeo4jTest\Backend> venv\Scripts\activate
 pip install -U Flask
 pip install -U neo4j
 pip install -U flask-cors
 pip install pyjwt
 
 PythonTest\pythonNeo4jTest\Backend\pythonTest> $env:FLASK_APP = "app"
 PythonTest\pythonNeo4jTest\Backend\pythonTest> flask run
```
## Sources origin
- https://flask.palletsprojects.com/en/2.0.x/quickstart/
- https://flask.palletsprojects.com/en/2.0.x/installation/#install-flask


# Neo4j
https://neo4j.com/download/neo4j-desktop/?edition=desktop&flavour=winstall64&release=1.4.7&offline=true

Steps to start database (Use windows program)
- Create new project
- Change password to "mainBD"
- Start database

# Git
git clone git@github.com:carlosgarciafullstack/pythonNeo4jTest.git


# Frontend
http://localhost:4200/

# Backend
http://127.0.0.1:5000/

# Neo4j

## Conect for admin database
Open chrome : http://localhost:7474/browser/

- Conect to BD witd:
    - Url:        bolt://localhost:7687
    - Authentication type User/Pass
    - User:       neo4j
    - Pass:       mainBD
