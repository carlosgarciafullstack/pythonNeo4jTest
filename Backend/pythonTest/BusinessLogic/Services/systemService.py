from DataAccess.Repositories.systemRepository import SystemRepository
from Models.userClass import UserClass
from ..authHelper import Auth

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

      userClass.setToken(Auth.encode_auth_token(userClass.id, userClass.name))
      return userClass

    except Exception as inst:
      return False
