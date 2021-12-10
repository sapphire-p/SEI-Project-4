from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Plant
from .serializers import PlantSerializer, PopulatedPlantSerializer


# ? For requests made to /plants/
class PlantListView(APIView):
    def get(self, request):
        plants = Plant.objects.all()
        serialized_plants = PopulatedPlantSerializer(plants, many=True)
        return Response(serialized_plants.data, status=status.HTTP_200_OK)

    def post(self, request):
        plant = PlantSerializer(data=request.data)
        if plant.is_valid():
            plant.save()
            return Response(plant.data, status=status.HTTP_201_CREATED)
        else:
            return Response(plant.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


# ? For requests made to /plants/pk/
class PlantDetailView(APIView):

    def get(self, request, pk):
        try:
            plant = Plant.objects.get(id=pk)
        except:
            return Response({'message': 'Plant not found'}, status=status.HTTP_404_NOT_FOUND)
        serialized_plant = PopulatedPlantSerializer(plant)
        return Response(serialized_plant.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        try:
            plant = Plant.objects.get(id=pk)
        except:
            return Response({'message': 'Plant not found'}, status=status.HTTP_404_NOT_FOUND)
        updated_plant = PopulatedPlantSerializer(plant, data=request.data)
        if updated_plant.is_valid():
            updated_plant.save()
            return Response(updated_plant.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_plant.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        try:
            plant = Plant.objects.get(id=pk)
            plant.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)
