from rest_framework import serializers
from .models import Plant

from reviews.serializers import ReviewSerializer


class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = '__all__'


class PopulatedPlantSerializer(PlantSerializer):
    review_set = ReviewSerializer(read_only=True, many=True)
