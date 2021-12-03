from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from .serializers import UserSerializer
User = get_user_model()


class RegisterView(APIView):

    # this register view takes the data sent in via the request body, passes it through the UserSerializer and creates a new user with it, or otherwise throws a 422 error
    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({'message': 'Registration successful'}, status=status.HTTP_202_ACCEPTED)

        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    # this login view finds the user by username in the db (in models.py, specified that username mst be unique=True)
    # Django's check_password function is used to check the pw, and if successful a JWT token is generated and sent back to front end with welcome message
    def post(self, request):
        # this uses username as the unique identifier for a user. By default Django specifies email must be unique, so email is often used.
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user_to_login = User.objects.get(username=username)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

        if not user_to_login.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})

        # creates token and specifies the length of time before the token expires (info held in 'exp' part of JWT token):
        dt = datetime.now() + timedelta(days=365)
        token = jwt.encode(
            {'sub': user_to_login.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        # if the user is successfully logged in, the JWT token and a welcome message is sent back in the response to front end:
        return Response({'token': token, 'message': f'Welcome back {user_to_login.username}!'})


# class UserListView(APIView):

#     def get(self, request):
#         users = User.objects.all()


# user detail view

# PUT request (self, request, pk (of plant)) - pk of the plant is taken from the url endpoint like params
# Django many-to-many ORM command
# plant = plant.object.get() #? Django ORM method to look up plant object by id
# user = user.object.get() #?

# ? Django ORM method to update the many-to-many association, i.e. add to the junction table between Users and Plants in the db
# ? see: https://docs.djangoproject.com/en/3.2/topics/db/examples/many_to_many/
# user.plants.add(plant)
# user.save()
