from neo4j import GraphDatabase

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

    @staticmethod
    def _getUser(tx, user):
        result = tx.run("MATCH (u:APP_USER { name: $name, password: $password }) "
                        "RETURN u , id(u)", name=user["name"], password=user["password"] )
        return result.single()[0]