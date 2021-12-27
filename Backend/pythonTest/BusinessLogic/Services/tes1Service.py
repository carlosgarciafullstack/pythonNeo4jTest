from DataAccess.Repositories.test1Repository import Test1Repository

class Test1Service:

  def test1GetData(self):
    try:
      repository = Test1Repository("bolt://localhost:7687", "neo4j", "mainBD")
      return repository.create_greeting("hello, world")

    except Exception as inst:
      print("Service: BD -- Conection Failure ", inst)
      raise Exception('BD -- Conection Failure', 'bd.Error')

    