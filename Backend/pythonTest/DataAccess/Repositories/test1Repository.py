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
    
    @staticmethod
    def _create_and_return_greeting(tx, message):
        result = tx.run("MERGE (a:Message) "
                        "SET a.message = $message "
                        "RETURN a.message + ', from node ' + id(a)", message=message)
        return result.single()[0]