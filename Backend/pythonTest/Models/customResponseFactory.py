from .successResponseClass import SuccessResponseClass

def successResponse(data, success, message):
    return SuccessResponseClass(data, success, message).serialize()