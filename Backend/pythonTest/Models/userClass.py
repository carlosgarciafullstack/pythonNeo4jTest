class UserClass:

    def __init__(self, id, name):
        #self.user = user
        #self.password = password
        self.name = name
        self.id = id
        self.token = ''

    def setToken(self, token):
        self.token = token

    def serialize(self):
        return self.__dict__