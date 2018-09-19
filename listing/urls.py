from django.conf.urls import url
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^$', views.post_list, name='post_list'),
    url(r'^service-worker.js', 
    	(TemplateView.as_view(
		    template_name="service-worker.js",
		    content_type='application/javascript',
		)), name='service-worker.js')
]