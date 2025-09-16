function initMap() {
    const mapDiv = document.getElementById('map');
    if (!mapDiv) return;

    // Coordenadas iniciales (por ejemplo, un punto central genérico)
    const initialCoords = { lat: 40.416775, lng: -3.703790 };

    const map = new google.maps.Map(mapDiv, {
        center: initialCoords,
        zoom: 8,
    });

    const locationButton = document.getElementById('get-location');
    locationButton.addEventListener('click', () => {
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
    });
}
