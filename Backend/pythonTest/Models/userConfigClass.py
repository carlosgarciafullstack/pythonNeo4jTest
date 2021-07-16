import json

class UserConfigClass:

  def __init__(self, background, classCssBackground):
    self.background = background
    self.classCssBackground = json.loads(classCssBackground)

  def serialize(self):
    return self.__dict__