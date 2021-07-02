from flask import Blueprint

from BusinessLogic.Services.tes1Service import Test1Service

test1Controller = Blueprint('test1-controller', __name__, template_folder='templates')

@test1Controller.route('/test1GetData', methods=['GET'])
def test1GetData():
  return { 'data': Test1Service.test1GetData()}