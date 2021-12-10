from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Review
from plants.models import Plant
from plants.serializers import PopulatedPlantSerializer
from .serializers import ReviewSerializer, PopulatedReviewSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly


# ? For requests made to /reviews/
class ReviewListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request):
        reviews = Review.objects.all()
        serialized_reviews = PopulatedReviewSerializer(reviews, many=True)
        return Response(serialized_reviews.data, status=status.HTTP_200_OK)

    def post(self, request):
        review = PopulatedReviewSerializer(data=request.data)
        if review.is_valid():
            # The line below was previously review.save() but this way the pk id of the user that is logged in when posting the review
            # will automatically be added as the value of the review_owner field in the review
            review.save(review_owner=request.user)
            # The syntax 'review.data['plant']' below is the Python syntax to get the value of the plant key out of an ordered dictionary
            # Instead of sending back the single review just created, this now sends back the whole plant, with alll reviews incl. the new one on it:
            plant = Plant.objects.get(id=review.data['plant'])
            serialized_plant = PopulatedPlantSerializer(plant)
            return Response(serialized_plant.data, status=status.HTTP_201_CREATED)
        else:
            return Response(review.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


# ? For requests made to /reviews/pk/
class ReviewDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def put(self, request, pk):
        try:
            review = Review.objects.get(id=pk)
        except:
            return Response({'message': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)
        updated_review = ReviewSerializer(review, data=request.data)
        if updated_review.is_valid():
            updated_review.save()
            return Response(updated_review.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_review.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        try:
            review = Review.objects.get(id=pk)
            review.delete()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)
