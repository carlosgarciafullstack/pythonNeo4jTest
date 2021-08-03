from DataAccess.dataDriver import DataDriver

class BaseRepository:

  def __init__(self):
    self.driver = DataDriver()

  def getNodeById(self, id):
    query = "MATCH (n) WHERE id(n) = "+ str(id) + " RETURN n"
    return self.driver.run(query)

  def setNodeById(self, id, propertyName, propertyValue):
    query = "MATCH (n) WHERE id(n) = "+ str(id) + " SET n."+ propertyName +" = '"+ propertyValue +"' RETURN n"
    return self.driver.run(query)