document.addEventListener('DOMContentLoaded', () => {
    const mapDiv = document.getElementById('map');
    if (!mapDiv) return;

    // Coordenadas del Parque Universal de Rick y Morty (Universal Studios Hollywood)
    const initialCoords = { lat: 34.138088, lng: -118.353470 };

    const map = L.map(mapDiv).setView([initialCoords.lat, initialCoords.lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Marcador para el Parque Universal
    let initialMarker = L.marker([initialCoords.lat, initialCoords.lng]).addTo(map)
        .bindPopup('Parque Universal de Rick y Morty')
        .openPopup();

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
                        map.removeLayer(initialMarker);
                        initialMarker = null;
                    }
                    if (userMarker) {
                        map.removeLayer(userMarker);
                    }

                    map.setView([userCoords.lat, userCoords.lng], 15);

                    // Crear nuevo marcador para el usuario
                    userMarker = L.marker([userCoords.lat, userCoords.lng]).addTo(map)
                        .bindPopup('Tu ubicación actual')
                        .openPopup();
                }, () => {
                    alert('No se pudo obtener tu ubicación.');
                });
            } else {
                alert('La geolocalización no es soportada por este navegador.');
            }
        }
    });
});