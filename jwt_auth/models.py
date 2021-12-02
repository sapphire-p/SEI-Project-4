from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    profile_image = models.CharField(
        max_length=500, default="https://res.cloudinary.com/dfgnpqkiv/image/upload/c_fill,h_300,r_max,w_300/v1638451738/The-Potting-Shed/robin-mathlener-8x3wjKJL_yE-unsplash_edit_eadnep.jpg")
    three_word_bio = models.CharField(
        max_length=100, default="Hi there everyone!")
    about_me = models.TextField(max_length=800, null=True, blank=True)
    must_have_plants = models.ManyToManyField("plants.Plant", blank=True)

    def __str__(self):
        return self.username
