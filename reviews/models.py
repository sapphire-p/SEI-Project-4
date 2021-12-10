from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


class Review(models.Model):
    rating = models.IntegerField(
        default=0,
        validators=[
            MaxValueValidator(5),
            MinValueValidator(0)
        ]
    )
    comment = models.TextField(max_length=1000, default="")
    plant = models.ForeignKey("plants.Plant", on_delete=models.CASCADE)
    review_owner = models.ForeignKey(
        "jwt_auth.User", on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return f"{self.rating}/5. {self.comment}"
