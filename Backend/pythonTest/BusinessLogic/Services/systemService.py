from DataAccess.Repositories.systemRepository import SystemRepository
from DataAccess.Repositories.baseRepository import BaseRepository
from Models.userClass import UserClass
from Models.userConfigClass import UserConfigClass
from Helpers.authHelper import Auth
import json

class SystemService:

  def login(self, user):
    entityResult = SystemRepository().getUser(user)
    entityCount = len(entityResult)

    if(entityCount == 0):
      raise Exception('SystemService - login - User Not Found', '0')
    elif(entityCount > 1):
      raise Exception('SystemService - login - Too many results', '1')
    else:
      user = entityResult[0]['u']
      id = entityResult[0]['id(u)']

      userClass = UserClass(id, user["name"])
      user = Auth.encode_auth_token(userClass)

      return user.serialize()


  def getUserConfig(self, user):
    entityResult = SystemRepository().getUserConfig(user)
    entityCount = len(entityResult)

    if(entityCount == 0):
      config = UserConfigClass("1", '{"value":"background-adjust-right","viewValue":"adjust_right"}')

      entityResult = SystemRepository().createUserConfig(user, config.serialize())
      userConfig = entityResult[0]['uc']
      return userConfig.serialize()
    elif(entityCount > 1):
      raise Exception('SystemService - getUserConfig - Too many results', '1')
    else:
      userConfig = entityResult[0]['uc']
      userConfigClass = UserConfigClass(userConfig["background"], userConfig["classCssBackground"])
      
      return userConfigClass.serialize()

  def createUser(self, user):
    entityResult = SystemRepository().isUserExists(user)
    entityCount = len(entityResult)
    if(entityCount == 0):
      entityResult = SystemRepository().createUser(user)
      return True
    else:
      raise Exception('User Exists', '1')