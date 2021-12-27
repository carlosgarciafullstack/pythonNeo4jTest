from DataAccess.dataDriver import DataDriver

class SystemRepository:
  def __init__(self):
    self.driver = DataDriver()

  def getUser(self, user):
    query = "MATCH (u:APP_USER { name: '"+ user['name'] +"', password: '"+ user['password'] +"' }) RETURN u, id(u) "
    return self.driver.run(query)

  def isUserExists(self, user):
    query = "MATCH (u:APP_USER { name: '"+ user['name'] +"' }) RETURN u, id(u) "
    return self.driver.run(query)

  def createUser(self, user):
    query = "CREATE (u:APP_USER { name: '"+ user['name'] +"', password: '"+ user['password'] +"' }) RETURN u, id(u) "
    return self.driver.run(query)

  def getUserConfig(self, user):
    query = "MATCH (u:APP_USER)-[r]-(uc:USER_CONFIG) WHERE id(u) = "+ str(user['id']) +" RETURN uc "
    return self.driver.run(query)

  def createUserConfig(self, user, config):
    query = 'MATCH (u:APP_USER {name: "'+ user['name'] +'"}) CREATE (u)-[r:RELATION_USER_CONFIG]->(uc:USER_CONFIG { background:"'+ str(config['background']) +'", classCssBackground:"'+ str(config['classCssBackground']) +'", mapBackground:"'+ str(config['mapBackground']) +'"  } ) RETURN uc '
    return self.driver.run(query)

  def saveUserConfig(self, user, config):
    query = 'MATCH (u:APP_USER {name: "'+ user['name'] +'"})-[r:RELATION_USER_CONFIG]->(uc:USER_CONFIG) SET uc.background = "'+ str(config['background']) +'", uc.classCssBackground = "'+ str(config['classCssBackground']) +'", uc.mapBackground = "'+ str(config['mapBackground']) +'" RETURN uc '
    return self.driver.run(query)
  #CREATE (u:APP_USER {name:"user1", password:"pass1", user:"user1"})
  #MATCH (u:APP_USER {name: "user1"}) CREATE (u)-[r:RELATION_USER_CONFIG]->(uc:USER_CONFIG { background:"1", classCssBackground:"{'value': 'background-adjust-right', 'viewValue': 'adjust_right'}"  } )  RETURN uc 