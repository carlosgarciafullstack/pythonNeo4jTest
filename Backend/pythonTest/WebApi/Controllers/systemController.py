from Models.customResponseFactory import successResponse
from flask import Blueprint, request
from BusinessLogic.Services.systemService import SystemService
from ..wraperAuth import *

systemController = Blueprint('system-controller', __name__, template_folder='templates')

@systemController.route('/login', methods=['POST'])
def login():
  try:
    userLogin = request.json
    user = SystemService().login(userLogin)
    return successResponse(user, True, '')

  except Exception as inst:
    print("SystemController /login - EXCEPTION ", inst)
    abort(401,'UNAUTHORIZED')

@systemController.route('/userConfig', methods=['Get'])
@authorize
def getUserConfig(user):
  try:
    config = SystemService().getUserConfig(user)
    return successResponse(config, True, '')
    
  except Exception as inst:
    print(">>>>>>>>>>>>>>>SystemController /userConfig - EXCEPTION ", inst)
    return successResponse([], False, inst.args[0])