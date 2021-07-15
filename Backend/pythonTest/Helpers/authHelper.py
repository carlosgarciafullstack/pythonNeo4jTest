import jwt, time
from . import config

class Auth():

    @staticmethod
    def encode_auth_token(id, name):
        """
            Generar token de autenticación
        :param user_id: int
        :param login_time: int(timestamp)
        :return: string
        """
        try:
            payload = {
                'data': {
                    'id': id,
                    'name': name,
                    'role': 0,
                    'dateTime': int(time.time())
                }
            }
            print("payload", payload)
            print("config.SECRET_KEY", config.SECRET_KEY)
            return jwt.encode(
                payload,
                config.SECRET_KEY,
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
            Verificar token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token)
            print("DECODE payload", payload)
            if ('data' in payload and 'id' in payload['data']):
                return payload
            else:
                raise jwt.InvalidTokenError
        except jwt.ExpiredSignatureError:
            return'Token expired '
        except jwt.InvalidTokenError:
            return 'Token inválido'
