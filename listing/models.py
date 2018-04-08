from django.db import models
from django.utils import timezone

# Create your models here.
class Location(models.Model):
	city = models.CharField(max_length=50)
	state = models.CharField(max_length=15, blank=True)
	state_abrv = models.CharField(max_length=4)
	latlong = models.TextField(blank=True)

	def publish_loc(self):
		self.save()

	def __str__(self):
		return self.city


class Listing(models.Model):
	author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
	company = models.CharField(max_length=200)
	locations = models.ManyToManyField(Location)
	desc = models.TextField(blank=True)
	empls = models.CharField(max_length=30, blank=True)
	published_date = models.DateTimeField(
		default=timezone.now)
	career_url = models.URLField(max_length=500)
	verified = models.BooleanField(default=False)

	def publish(self):
		self.published_date = timezone.now()
		self.save()

	def __str__(self):
		return self.company

# class Company_Location_Mapping(models.Model):
# 	company = models.ManyToManyField(Listing)
# 	location = models.ManyToManyField(Location)

# 	class Meta:
# 		unique_together = ('company', 'location',)

# 	def publish_map(self):
# 		self.save()

# 	def __str__(self):
# 		return self.company.company + ' - ' + self.location.city