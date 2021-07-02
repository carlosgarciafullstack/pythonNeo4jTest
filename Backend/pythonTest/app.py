from flask import Flask
from flask_cors import CORS, cross_origin

from WebApi.Controllers.test1Controller import test1Controller

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
  return "<p>Hello, World!</p>"

app.register_blueprint(test1Controller)