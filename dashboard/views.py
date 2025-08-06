from typing import Counter
from django.shortcuts import render
import requests
from django.conf import settings
# Create your views here.

def index(request):
    response = requests.get(settings.API_URL)  # URL de la API
    posts = response.json()  # Convertir la respuesta a JSON

    # Número total de respuestas
    total_responses = len(posts)
    #product_ids = [entry for entry in posts.values()]
    #product_counter = Counter(product_ids)
    #most_requested_product = product_counter.most_common(1)[0]
    data = {
        'title': "Landing Page' Dashboard",
        'total_responses': total_responses,
        #'most_requested_product': most_requested_product[0]
    }

    return render(request, 'dashboard/index.html', data)