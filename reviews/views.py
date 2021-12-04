from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Review
from .serializers import ReviewSerializer
# PopulatedReviewSerializer


# ? For requests made to /reviews/
class ReviewListView(APIView):
    def get(self, request):
        reviews = Review.objects.all()
        serialized_reviews = ReviewSerializer(reviews, many=True)
        return Response(serialized_reviews.data, status=status.HTTP_200_OK)

    def post(self, request):
        review = ReviewSerializer(data=request.data)
        if review.is_valid():
            review.save()
            return Response(review.data, status=status.HTTP_201_CREATED)
        else:
            return Response(review.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


# ? For requests made to /reviews/pk/
class ReviewDetailView(APIView):

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


# ? There is not a use case for GETting and returning a single review using its id number
    # def get(self, request, pk):
    #     try:
    #         review = Review.objects.get(id=pk)
    #     except:
    #         return Response({'message': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)
    #     serialized_review = ReviewSerializer(review)
    #     return Response(serialized_review.data, status=status.HTTP_200_OK)
