function initMap() {
    const mapDiv = document.getElementById('map');
    if (!mapDiv) return;

    // Coordenadas del Parque Universal de Rick y Morty (Universal Studios Hollywood)
    const initialCoords = { lat: 34.138088, lng: -118.353470 };

    const map = new google.maps.Map(mapDiv, {
        center: initialCoords,
        zoom: 15, // Aumentado el zoom para ver mejor la ubicación
    });

    // Marcador para el Parque Universal
    new google.maps.Marker({
        position: initialCoords,
        map: map,
        title: 'Parque Universal de Rick y Morty',
    });

    const locationButton = document.getElementById('get-location');
    locationButton.addEventListener('click', () => {
        if (confirm("¿Deseas compartir tu ubicación?")) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const userCoords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    map.setCenter(userCoords);
                    map.setZoom(15);
                    new google.maps.Marker({
                        position: userCoords,
                        map: map,
                        title: 'Tu ubicación actual',
                    });
                }, () => {
                    alert('No se pudo obtener tu ubicación.');
                });
            } else {
                alert('La geolocalización no es soportada por este navegador.');
            }
        }
    });
}
