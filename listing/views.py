from django.shortcuts import render
from .models import Listing, Location
import json 

# Create your views here.
def post_list(request):
    listings = Listing.objects.all()

    serialized = []
    for listing in listings:
    	listing.locs = listing.locations.all()

    	ser_listing = {
    		'company': listing.company,
    		'description': listing.desc,
    		'url': listing.career_url,
    	}

    	ser_listing['locations'] = []
    	for loc in listing.locs:
    		ser_listing['locations'].append('%s, %s' % (loc.city, loc.state_abrv))
    	
    	serialized.append(ser_listing)
    	
    return render(
    	request, 
    	'listing/post_list.html', 
    	{
    		'listings': listings, 
    		'serialized': json.dumps(serialized)
    	})