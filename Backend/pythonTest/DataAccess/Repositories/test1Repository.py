from neo4j import GraphDatabase

class Test1Repository:

    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def create_greeting(self, message):
        with self.driver.session() as session:
            greeting = session.write_transaction(self._create_and_return_greeting, message)
            self.close()
            return (greeting)
    
    def getUserTest(self, user):
        with self.driver.session() as session:
            greeting = session.write_transaction(self._getUserTest, user)
            self.close()
            return (greeting)

    @staticmethod
    def _create_and_return_greeting(tx, message):
        result = tx.run("MERGE (a:Message) "
                        "SET a.message = $message "
                        "RETURN a.message + ', from node ' + id(a)", message=message)
        return result.single()[0]

    @staticmethod
    def _getUserTest(tx, user):
        result = tx.run("MATCH (u:APP_USER { name: $name, password: $password }) "
                        "RETURN u ", name=user["name"], password=user["password"] )
        return result.single()[0]