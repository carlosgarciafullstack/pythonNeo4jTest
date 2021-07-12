class UserClass:

    def __init__(self, user, password, name):
        self.user = user
        self.password = password
        self.name = name
        self.id = 0

    def serialize(self):
        return self.__dict__