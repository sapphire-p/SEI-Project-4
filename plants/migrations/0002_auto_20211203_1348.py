# Generated by Django 3.2.9 on 2021-12-03 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plants', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plant',
            name='description',
            field=models.TextField(default=None, max_length=1000),
        ),
        migrations.AlterField(
            model_name='plant',
            name='height_in_cm',
            field=models.DecimalField(decimal_places=0, default=None, max_digits=3),
        ),
        migrations.AlterField(
            model_name='plant',
            name='image',
            field=models.CharField(default=None, max_length=800),
        ),
        migrations.AlterField(
            model_name='plant',
            name='light_level',
            field=models.CharField(default=None, max_length=100),
        ),
        migrations.AlterField(
            model_name='plant',
            name='name',
            field=models.CharField(default=None, max_length=200),
        ),
        migrations.AlterField(
            model_name='plant',
            name='price',
            field=models.DecimalField(decimal_places=2, default=None, max_digits=10),
        ),
        migrations.AlterField(
            model_name='plant',
            name='watering_frequency',
            field=models.CharField(default=None, max_length=100),
        ),
    ]
