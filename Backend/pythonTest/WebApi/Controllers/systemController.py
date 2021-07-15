from Models.customResponseFactory import successResponse
from flask import Blueprint, request
from BusinessLogic.Services.systemService import SystemService
from ..wraperAuth import *

systemController = Blueprint('system-controller', __name__, template_folder='templates')

@systemController.route('/login', methods=['POST'])
def login():
  try:
    service = SystemService()
    user = request.json
    result = service.login(user)
    return result

  except Exception as inst:
    print("SystemController /login - EXCEPTION ", inst)
    abort(401,'UNAUTHORIZED')

@systemController.route('/userConfig', methods=['Get'])
@authorize
def getUserConfig(user):

  try:
    service = SystemService()
    return service.getUserConfig(user)

  except Exception as inst:
    print("SystemController /userConfig - EXCEPTION ", inst)
    return successResponse([], False, inst.args[0])