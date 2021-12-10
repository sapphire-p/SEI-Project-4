from rest_framework import serializers
from .models import Review
from jwt_auth.serializers2 import UsernameOnlyUserSerializer


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class PopulatedReviewSerializer(ReviewSerializer):
    review_owner = UsernameOnlyUserSerializer(read_only=True)
