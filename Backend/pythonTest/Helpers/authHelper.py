import jwt, time
from WebApi.systemConfig import *

class Auth():

    @staticmethod
    def encode_auth_token(user):
        try:
            payload = {
                'data': {
                    'id': user.id,
                    'name': user.name,
                    'role': 0,
                    'dateTime': int(time.time())
                }
            }
            token = jwt.encode(
                payload,
                TOKEN_SECRET_KEY,
                algorithm='HS256'
            )
            user.setToken(token)
            return user
        except Exception as e:
            print("JWT EXCEPTION", e)
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        payload = jwt.decode(auth_token, TOKEN_SECRET_KEY, options={ 'verify_exp': False}, algorithms=["HS256"])
        if ('data' in payload and 'id' in payload['data']):
            return payload
        else:
            raise jwt.InvalidTokenError
    
