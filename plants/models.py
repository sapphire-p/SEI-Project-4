from django.db import models

# Create your models here.


class Plant(models.Model):
    name = models.CharField(max_length=100, default=None)
    image = models.CharField(max_length=500, default=None)
    description = models.TextField()
