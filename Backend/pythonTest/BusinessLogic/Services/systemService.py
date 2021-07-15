from DataAccess.Repositories.systemRepository import SystemRepository
from Models.userClass import UserClass
from Models.userConfigClass import UserConfigClass
from Helpers.authHelper import Auth

class SystemService:

  def login(self, user):
    repository = SystemRepository("bolt://localhost:7687", "neo4j", "mainBD")
    entityResult = repository.getUser(user)
    try:

      if(len(entityResult) != 1):
        raise Exception('No valid', '0')

      user = entityResult[0]['u']
      id = entityResult[0]['id(u)']

      userClass = UserClass(id, user["name"])
      token = Auth.encode_auth_token(userClass.id, userClass.name)
      userClass.setToken(token)
      tokenUser = Auth.decode_auth_token(token)
      print("tokenUser = Auth.decode_auth_token(token)", tokenUser)
      return userClass

    except Exception as inst:
      return False

  def getUserConfig(self, user):
    repository = SystemRepository("bolt://localhost:7687", "neo4j", "mainBD")
    user.id = int(user.id)
    entityResult = repository.getUserConfig(user)
    try:

      if(len(entityResult) != 1):
        raise Exception('No valid', '0')

      userConfig = entityResult[0]['uc']
      userConfigClass = UserConfigClass(userConfig["background"], userConfig["classCssBackground"])
      
      return userConfigClass

    except Exception as inst:
      return False
  