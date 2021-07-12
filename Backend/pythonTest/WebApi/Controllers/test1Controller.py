from flask import Blueprint,  jsonify, request
from Models.userClass import UserClass
from BusinessLogic.Services.tes1Service import Test1Service

test1Controller = Blueprint('test1-controller', __name__, template_folder='templates')

@test1Controller.route('/test1GetData', methods=['GET'])
def test1GetData():
  return { 'data': Test1Service.test1GetData()}

@test1Controller.route('/test2GetData', methods=['GET'])
def test2GetData():
  return jsonify(Test1Service.test2GetData).serialize()

@test1Controller.route('/login', methods=['POST'])
def login():
  service = Test1Service()
  user = request.json
  result = service.test2GetData(user)

  return jsonify(result.serialize())
