from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Plant
from .serializers import PlantSerializer

# from rest_framework.exceptions import PermissionDenied
# from datetime import datetime, timedelta
# from django.contrib.auth import get_user_model
# from django.conf import settings
# import jwt
# User = get_user_model()


# ? For requests made to /plants/
class PlantListView(APIView):
    def get(self, request):
        plants = Plant.objects.all()
        serialized_plants = PlantSerializer(plants, many=True)
        return Response(serialized_plants.data, status=status.HTTP_200_OK)


# ? For requests made to /plants/pk/
class PlantDetailView(APIView):

    def get(self, request, pk):
        try:
            plant = Plant.objects.get(id=pk)
        except:
            return Response({'message': 'Plant not found'}, status=status.HTTP_404_NOT_FOUND)
        serialized_plant = PlantSerializer(plant)
        return Response(serialized_plant.data, status=status.HTTP_200_OK)
