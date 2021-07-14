from flask import Blueprint,  jsonify, request
from BusinessLogic.Services.systemService import SystemService

systemController = Blueprint('system-controller', __name__, template_folder='templates')

@systemController.route('/login', methods=['POST'])
def login():
  service = SystemService()
  user = request.json
  result = service.login(user)

  return jsonify(result.serialize())