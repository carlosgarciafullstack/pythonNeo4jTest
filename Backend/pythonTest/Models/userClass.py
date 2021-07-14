class UserClass:

    def __init__(self, id, user, password, name):
        self.user = user
        self.password = password
        self.name = name
        self.id = id

    def serialize(self):
        return self.__dict__