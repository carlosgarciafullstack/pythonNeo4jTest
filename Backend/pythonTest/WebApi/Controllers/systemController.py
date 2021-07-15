from flask import Blueprint,  jsonify, request
from flask.wrappers import Response
from BusinessLogic.Services.systemService import SystemService
from Helpers.authHelper import Auth

systemController = Blueprint('system-controller', __name__, template_folder='templates')

@systemController.route('/login', methods=['POST'])
def login():
  service = SystemService()
  user = request.json
  result = service.login(user)

  if (result):
    return jsonify(result.serialize())
  else:
    r = Response(response="UNAUTHORIZED", status=401, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

@systemController.route('/userConfig', methods=['Get'])
def getUserConfig():
  token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrZW4iLCJkYXRhIjp7ImlkIjowLCJuYW1lIjoiY2FybG9zIiwicm9sZSI6MCwiZGF0ZVRpbWUiOjE2MjYzMDc2OTJ9fQ.NJIMA7bvyvwvfrKs2L0_Zd83dG-p4EDehNfpsiYDNJ0"
  service = SystemService()
  user = Auth.decode_auth_token(token)
  print("DECODE TOKEN", user)
  result = service.getUserConfig(user)

  if (result):
    return jsonify(result.serialize())
  else:
    r = Response(response="UNAUTHORIZED", status=401, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r