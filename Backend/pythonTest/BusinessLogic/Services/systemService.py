from DataAccess.Repositories.systemRepository import SystemRepository
from DataAccess.Repositories.baseRepository import BaseRepository
from Models.userClass import UserClass
from Models.userConfigClass import UserConfigClass
from Helpers.authHelper import Auth

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
    entityResult2 = BaseRepository().getNodeById(10)
    print("BY ID", entityResult2)
    entityResult3 = BaseRepository().getUserConfig(10, "propiedad1", "valorPropiedad1")
    print("BY ID", entityResult3)

    entityResult = SystemRepository().getUserConfig(user)
    print("BY ID", entityResult)
    entityCount = len(entityResult)

    if(entityCount == 0):
      raise Exception('SystemService - getUserConfig - UserConfig Not Found', '0')
    elif(entityCount > 1):
      raise Exception('SystemService - getUserConfig - Too many results', '1')
    else:
      userConfig = entityResult[0]['uc']
      userConfigClass = UserConfigClass(userConfig["background"], userConfig["classCssBackground"])
      
      return userConfigClass.serialize()
