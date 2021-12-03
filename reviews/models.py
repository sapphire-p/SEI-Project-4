from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

User = get_user_model()  # ? do I need to import this? Maybe not?


class Review(models.Model):
    rating = models.IntegerField(
        default=0,
        validators=[
            MaxValueValidator(5),
            MinValueValidator(0)
        ]
    )
    comment = models.TextField(max_length=1000)
    plant = models.ForeignKey("plants.Plant", on_delete=models.CASCADE)
    user = models.ForeignKey(
        "jwt_auth.User", on_delete=models.CASCADE)  # ? is this correct? Alex says maybe, or may have to put User instead of "jwt_auth.User".

    def __str__(self):
        return f"{self.rating}/5. {self.comment}"
