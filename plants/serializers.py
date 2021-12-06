from rest_framework import serializers
from .models import Plant

from reviews.serializers import PopulatedReviewSerializer


class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = '__all__'


class PopulatedPlantSerializer(PlantSerializer):
    review_set = PopulatedReviewSerializer(read_only=True, many=True)
