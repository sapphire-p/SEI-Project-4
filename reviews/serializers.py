from rest_framework import serializers
from .models import Review
from jwt_auth.serializers2 import UsernameOnlyUserSerializer

# from jwt_auth.serializers import UserSerializer
# from jwt_auth.serializers import NonRegistrationUserSerializer
# ! from jwt_auth.models import User


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class PopulatedReviewSerializer(ReviewSerializer):
    review_owner = UsernameOnlyUserSerializer(read_only=True)

# class PopulatedReviewSerializer(ReviewSerializer):
#     user = NonRegistrationUserSerializer(many=True)


# ? Previously was this:
# class ReviewSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Review
#         fields = '__all__'
