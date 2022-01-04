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
  
 $env:FLASK_APP = "app"
 
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

# Neo4j install server
1. Java https://www.openlogic.com/openjdk-downloads Version 11
2. Neo4j Community Server for Windowns https://neo4j.com/download-center/#community
3. Configure JAVA_HOME -> C:\Program Files\OpenJDK\jdk-11.0.8.10-hotspot
4. Restar pc
5. Path to neo4j/bin, execute "neo4j console" to init server 
6. Init http://localhost:7474/browser/ webbrowsert
7. Init conexion and change password for: mainBD
8. Stop server neo4j, in neo4j console use Cont+C
9. Path to neo4j/bin, execute "neo4j console" to init server 

## Conect for admin database
Open chrome : http://localhost:7474/browser/

- Conect to BD witd:
    - Url:        bolt://localhost:7687
    - Authentication type User/Pass
    - User:       neo4j
    - Pass:       mainBD

#ThreeJS with Angular and custom canvas
https://github.com/JohnnyDevNull/ng-three-template