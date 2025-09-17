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

    
});