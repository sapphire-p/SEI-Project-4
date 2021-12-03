from django.db import models

# Create your models here.


class Plant(models.Model):
    name = models.CharField(max_length=200, default=None)
    image = models.CharField(max_length=800, default=None)
    description = models.TextField(max_length=1000, default=None)
    height_in_cm = models.DecimalField(
        max_digits=3, decimal_places=0, default=None)
    light_level = models.CharField(max_length=100, default=None)
    watering_frequency = models.CharField(max_length=100, default=None)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, default=None)

    def __str__(self):
        return self.name
