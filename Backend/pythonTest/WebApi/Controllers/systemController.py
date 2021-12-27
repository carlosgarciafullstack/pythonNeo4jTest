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

@systemController.route('/newUser', methods=['POST'])
def newUser():
  try:
    userLogin = request.json
    createdUser = SystemService().createUser(userLogin)
    return successResponse(createdUser, True, '')

  except Exception as inst:
    print("SystemController /newUser - EXCEPTION ", inst)
    if(inst.args[1] == '1'):
      return successResponse([], False, inst.args[1])
    else:
      return successResponse([], False, inst.args[0])

@systemController.route('/userConfig', methods=['Get'])
@authorize
def getUserConfig(user):
  try:
    config = SystemService().getUserConfig(user)
    return successResponse(config, True, '')
    
  except Exception as inst:
    print(">>>>>>>>>>>>>>>SystemController GET /userConfig - EXCEPTION ", inst)
    return successResponse([], False, inst.args[0])

@systemController.route('/userConfig', methods=['POST'])
@authorize
def setUserConfig(user):
  try:
    userConfig = request.json
    config = SystemService().setUserConfig(user, userConfig)
    return successResponse(config, True, '')
    
  except Exception as inst:
    print(">>>>>>>>>>>>>>>SystemController POST /userConfig - EXCEPTION ", inst)
    return successResponse([], False, inst.args[0])