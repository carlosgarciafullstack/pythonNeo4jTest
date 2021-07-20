from DataAccess.dataDriver import DataDriver

class BaseRepository:

  def getNodeById(self, id):
    query = "MATCH (n) WHERE id(n) = "+ str(id) + " RETURN n"
    print("getNodeById", query)
    return DataDriver().run(query)

  def setNodeById(self, id, propertyName, propertyValue):
    query = "MATCH (n) WHERE id(n) = "+ str(id) + " SET n."+ propertyName +" = '"+ propertyValue +"' RETURN n"
    print("setNodeById", query)
    return DataDriver().run(query)