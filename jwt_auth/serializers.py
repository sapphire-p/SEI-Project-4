from rest_framework import serializers
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    # defines the fields that are updated by this serializer, as we cannot save pws to the db as the plain text the user inputs
    # 'write_only=True' here is because we never want to read pws from the db:
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        # use .pop() method to remove pw and pw_confirmation from the request body
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        # check if the pw entered matches the pw_confirmation entered, throw error if they do not:
        if password != password_confirmation:
            raise serializers.ValidationError(
                {'password_confirmation': 'Passwords do not match'})

    # check if pw is valid and in a format Django can receive, using Django validate_password method:
        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

    # if pw is in a valid format, hash it and add that value to a new field called ‘password’ in the data object - this will become the serializer.data property and will ultimately be stored in the db:
    # 'make_password' is an in-built Djngo function
        data['password'] = make_password(password)
        return data

    # specifies to serializer to only include the specified fields (we do not need to use all of the extra default fields that exist in Django’s User table in our frontend):
    class Meta:
        model = User
        fields = (
            'username', 'email', 'password', 'password_confirmation',
            'profile_image', 'three_word_bio', 'about_me'
        )


# this serializer is used for user-related requests that are NOT to do with Registering a new user (e.g. GET all users, GET single user, etc.)
class NonRegistrationUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'profile_image', 'three_word_bio', 'about_me', 'must_have_plants'
        )


# class nonREgistrationUserSerializer
# separate serializer that includes all fields - add all fields to the non-registration serializer
