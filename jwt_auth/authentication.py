from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
# imports the secret key (held in .env file, then hidden in .gitignore) via config in settings:
from django.conf import settings
import jwt
User = get_user_model()


class JWTAuthentication(BasicAuthentication):
    def authenticate(self, request):
        # get token from the request:
        header = request.headers.get('Authorization')

        # if no token in Header, return None:
        if not header:
            return None

        # return None if Header starts with 'Basic', indicating Django's default BasicAuthentication is being used (we want to use jwt library’s authentication methods instead):
        if header.startswith('Basic'):
            return None

        # if token is in incorrect format, throw an error ('raise' means throw an error):
        if not header.startswith('Bearer'):
            raise PermissionDenied({'message': 'Invalid authorization header'})

        # if Header does start with 'Bearer', extract just the token by replacing 'Bearer' with an empty string:
        token = header.replace('Bearer ', '')

        try:
            # decode the token to get the payload (part with info on user and when token created), using token, the secret and default algorithm:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            # use the 'sub' or subject part of the token as the user id to find that user in the db:
            user = User.objects.get(pk=payload.get('sub'))
        # if an issue with invalid token or decoding fails, throw an error:
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied({'message': 'Invalid Token'})
        # if user not found by their id in the db, throw an error:
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'User not found'})

        # if all good, return the user found in the db and the valid token, for use in the programme (not returning to front end here):
        return (user, token)
