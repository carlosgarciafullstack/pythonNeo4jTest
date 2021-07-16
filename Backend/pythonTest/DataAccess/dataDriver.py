from neo4j import GraphDatabase
from WebApi.systemConfig import *

class DataDriver:
  def __init__(self):
    uri = BD_URI
    user = BD_USER
    password = BD_PASS
    self.driver = GraphDatabase.driver(uri, auth=(user, password))

  def close(self):
    self.driver.close()

  def run(self, query):
    with self.driver.session() as session:
      greeting = session.write_transaction(lambda tx: tx.run(query).data())
      self.close()
      return (greeting)