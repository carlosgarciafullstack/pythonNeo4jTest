from DataAccess.dataDriver import DataDriver

class SystemRepository:

    def getUser(self, user):
        query = "MATCH (u:APP_USER { name: '"+ user['name'] +"', password: '"+ user['password'] +"' }) RETURN u, id(u) "
        return DataDriver().run(query)

    def getUserConfig(self, user):
        query = "MATCH (u:APP_USER)-[r]-(uc:USER_CONFIG) WHERE id(u) = "+ str(user['id']) +" RETURN uc "
        return DataDriver().run(query)


'''
MATCH (n)
WHERE id(n) = 2
SET n.classCssBackground = 'background-adjust-right'
'''