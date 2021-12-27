import json

class UserConfigClass:

  def __init__(self, background, classCssBackground, mapBackground):
    self.background = background
    classCssBackground = classCssBackground.replace("\'", "\"")
    self.classCssBackground = json.loads(classCssBackground)
    self.mapBackground = mapBackground
  def serialize(self):
    return self.__dict__