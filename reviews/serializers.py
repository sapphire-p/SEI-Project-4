from rest_framework import serializers
from .models import Review

# from jwt_auth.serializers import UserSerializer
# from jwt_auth.serializers import NonRegistrationUserSerializer
# ! from jwt_auth.models import User


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


# class PopulatedReviewSerializer(ReviewSerializer):
#     user = NonRegistrationUserSerializer(many=True)
