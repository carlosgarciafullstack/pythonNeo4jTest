from DataAccess.Repositories.systemRepository import SystemRepository
from Models.userClass import UserClass

class SystemService:

  def login(self, user):
    repository = SystemRepository("bolt://localhost:7687", "neo4j", "mainBD")
    entity = repository.getUser(user)
    return UserClass(entity.id, entity["user"], entity["password"], entity["name"])
