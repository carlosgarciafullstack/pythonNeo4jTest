class SuccessResponseClass:

  def __init__(self, data, success, message):
    self.data = data
    self.success = success
    self.message = message

  def serialize(self):
    return self.__dict__