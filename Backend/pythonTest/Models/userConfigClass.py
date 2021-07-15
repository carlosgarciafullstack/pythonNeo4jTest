
class UserConfigClass:

    def __init__(self, background, classCssBackground):
        self.background = background
        self.classCssBackground = classCssBackground

    def serialize(self):
        return self.__dict__