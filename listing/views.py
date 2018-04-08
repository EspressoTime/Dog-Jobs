from django.shortcuts import render
from .models import Listing

# Create your views here.
def post_list(request):
    listings = Listing.objects.all()
    for listing in listings:
    	listing.locs = listing.locations.all()
    return render(request, 'listing/post_list.html', {'listings': listings})