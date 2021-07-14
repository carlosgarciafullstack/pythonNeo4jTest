from flask import Blueprint,  jsonify, request
from flask.wrappers import Response
from BusinessLogic.Services.systemService import SystemService

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
