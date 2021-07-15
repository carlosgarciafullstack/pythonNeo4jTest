from functools import wraps
from flask import request, abort
from Helpers.authHelper import Auth
import jwt

def authorize(fn):
  @wraps(fn)
  def authorize(*args, **kwargs):
    try:
      bearer = request.headers.get('Authorization')
      token = bearer.split()[1]
      user = Auth.decode_auth_token(token)['data']
      return fn(user, **kwargs)

    except jwt.ExpiredSignatureError:
      print('Authorize Exception: Token expired')
      abort(401, 'Token expired')

    except jwt.InvalidTokenError:
      print('Authorize Exception: Invalid token')
      abort(401, 'Invalid token')

    except Exception as inst:
      print('MAIN EXCEPTION', inst)
      abort(500,'MAIN EXCEPTION')

  return authorize