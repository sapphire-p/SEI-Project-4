from plants.models import Plant  # ? imports Plant model from plants app
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from .serializers import UserSerializer, NonRegistrationUserSerializer
User = get_user_model()


# ? For requests made to /users/register/
class RegisterView(APIView):

    # this register view takes the data sent in via the request body, passes it through the UserSerializer and creates a new user with it, or otherwise throws a 422 error
    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({'message': 'Registration successful'}, status=status.HTTP_202_ACCEPTED)

        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


# ? For requests made to /users/login/
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


# ? For requests made to /users/
class UserListView(APIView):
    def get(self, request):
        users = User.objects.all()
        serialized_users = NonRegistrationUserSerializer(users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)


# ? For requests made to /users/pk/
class UserDetailView(APIView):

    def get(self, request, pk):
        try:
            user = User.objects.get(id=pk)
        except:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        serialized_user = NonRegistrationUserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

    # this updates the must_have_plants field associated with the user (Many-To-Many relationship between Users and Plants):
    # the user's pk (id) is taken from the URL endpoint the request is made to
    # the plant's pk (id) is taken from the JSON request body, which must contain a "plant_id" field, e.g. "plant_id": 1
    def put(self, request, pk):
        plant_id = request.data.get('plant_id')
        try:
            user = User.objects.get(id=pk)
        except:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        try:
            plant = Plant.objects.get(id=plant_id)
        except:
            return Response({'message': 'Plant not found'}, status=status.HTTP_404_NOT_FOUND)
        user.must_have_plants.add(plant)
        user.save()
        serialized_user = NonRegistrationUserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            user = User.objects.get(id=pk)
        except:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        try:
            user.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

# this has now been implemented in user detail view:

# PUT request (self, request, pk (of user)) - pk of the user is taken from the url endpoint like params, JSON request body contains field e.g. "plant_id": "1"
# plant = Plant.object.get(id=plant_id) #? Django ORM method to look up plant object by id
# user = User.objects.get(id=pk) #? Django ORM method to look up user by id

# Django many-to-many ORM command
# ? Django ORM method to update the many-to-many association, i.e. add to the junction table between Users and Plants in the db
# ? see: https://docs.djangoproject.com/en/3.2/topics/db/examples/many_to_many/
# user.plants.add(plant)
# user.save()
