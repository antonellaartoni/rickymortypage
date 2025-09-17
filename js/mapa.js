function initMap() {
    const mapDiv = document.getElementById('map');
    if (!mapDiv) return;

    // Coordenadas del Parque Universal de Rick y Morty (Universal Studios Hollywood)
    const initialCoords = { lat: 34.138088, lng: -118.353470 };

    const map = new google.maps.Map(mapDiv, {
        center: initialCoords,
        zoom: 15,
    });

    // Marcador para el Parque Universal
    let initialMarker = new google.maps.Marker({
        position: initialCoords,
        map: map,
        title: 'Parque Universal de Rick y Morty',
    });

    let userMarker = null;

    const locationButton = document.getElementById('get-location');
    locationButton.addEventListener('click', () => {
        if (confirm("¿Deseas compartir tu ubicación?")) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const userCoords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    // Limpiar marcadores anteriores
                    if (initialMarker) {
                        initialMarker.setMap(null);
                        initialMarker = null;
                    }
                    if (userMarker) {
                        userMarker.setMap(null);
                    }

                    map.setCenter(userCoords);
                    map.setZoom(15);

                    // Crear nuevo marcador para el usuario
                    userMarker = new google.maps.Marker({
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
