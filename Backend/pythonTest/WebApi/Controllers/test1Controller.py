from flask import Blueprint,  jsonify
from BusinessLogic.Services.tes1Service import Test1Service
from Models.customResponseFactory import successResponse

test1Controller = Blueprint('test1-controller', __name__, template_folder='templates')
service = Test1Service()

@test1Controller.route('/test1GetData', methods=['GET'])
def test1GetData():
  try:
    result = service.test1GetData()
    return successResponse(result, True, '')

  except Exception as inst:
    print("Controller: BD -- Conection Failure ", inst)
    return successResponse(inst.args[1], True, inst.args[0])
    
@test1Controller.route('/test2GetData', methods=['GET'])
def test2GetData():
  return jsonify(service.test2GetData).serialize()
