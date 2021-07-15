from neo4j import GraphDatabase

'''
https://neo4j.com/docs/api/python-driver/current/api.html#neo4j.Result
https://neo4j.com/docs/api/python-driver/current/api.html#neo4j.Record
https://neo4j.com/docs/api/python-driver/current/api.html#neo4j.Record.data
'''


class SystemRepository:

    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def getUser(self, user):
        with self.driver.session() as session:
            greeting = session.write_transaction(self._getUser, user)
            self.close()
            return (greeting)


    def getUserConfig(self, user):
        with self.driver.session() as session:
            greeting = session.write_transaction(self._getUserConfig, user)
            self.close()
            return (greeting)

    @staticmethod
    def _getUser(tx, user):
        queryResult = tx.run("MATCH (u:APP_USER { name: $name, password: $password }) "
                        "RETURN u, id(u) ", name=user["name"], password=user["password"] )
        return queryResult.data()


    @staticmethod
    def _getUserConfig(tx, user):
        queryResult = tx.run("MATCH (u:APP_USER)-[r]-(uc:USER_CONFIG) WHERE id(u) = $id "
                        "RETURN uc", id=user["id"] )
        return queryResult.data()



