from DataAccess.Repositories.test1Repository import Test1Repository
from Models.userClass import UserClass

class Test1Service:

  def test1GetData(self):
    a = Test1Repository("bolt://localhost:7687", "neo4j", "mainBD")
    return a.create_greeting("hello, world")

  def test2GetData(self, user):
    repository = Test1Repository("bolt://localhost:7687", "neo4j", "mainBD")
    entity = repository.getUserTest(user)
    return UserClass(entity["user"], entity["name"], entity["password"])
