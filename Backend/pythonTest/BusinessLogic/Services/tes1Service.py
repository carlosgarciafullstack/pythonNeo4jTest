from DataAccess.Repositories.test1Repository import Test1Repository

class Test1Service:

  def test1GetData(self):
    a = Test1Repository("bolt://localhost:7687", "neo4j", "mainBD")
    return a.create_greeting("hello, world")