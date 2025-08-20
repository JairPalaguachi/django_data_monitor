from typing import Counter
from django.shortcuts import render
import requests
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import login_required, permission_required
# Create your views here.

@login_required
@permission_required('dashboard.index_viewer', raise_exception=True)
def index(request):
    response = requests.get(settings.API_URL)  # URL de la API
    posts = response.json()  # Convertir la respuesta a JSON

    # Convertir a lista si es dict
    if isinstance(posts, dict):
        reviews = list(posts.values())
    else:
        reviews = posts

    # Número total de respuestas
    total_responses = len(reviews)

    # Calcular la calificación más frecuente
    ratings = [r.get('rating') for r in reviews if 'rating' in r]
    # Calcular el promedio de calificación
    avg_rating = round(sum(ratings) / len(ratings), 2) if ratings else None
    from collections import Counter
    rating_counter = Counter(ratings)
    most_common_rating = rating_counter.most_common(1)[0][0] if rating_counter else None
    # Calificación menos frecuente (si hay más de una)
    least_common_rating = None
    if rating_counter:
        least_common = [item for item in rating_counter.most_common()][-1]
        least_common_rating = least_common[0]

    # Frecuencia de cada rating para el gráfico
    rating_labels = sorted(set(ratings))
    rating_counts = [rating_counter.get(r, 0) for r in rating_labels]

    data = {
        'title': "Landing Page' Dashboard",
        'total_responses': total_responses,
        'most_common_rating': most_common_rating,
        'least_common_rating': least_common_rating,
        'avg_rating': avg_rating,
        'reviews': reviews,
        'rating_labels': rating_labels,
        'rating_counts': rating_counts,
    }

    return render(request, 'dashboard/index.html', data)