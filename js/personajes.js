document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('characters-gallery');

    // Dark Mode Toggle Logic (Keep existing)
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = false;
    }

    // Toggle dark mode on switch change
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Prevenimos la ejecución en páginas que no tienen el contenedor de la galería
    if (!gallery) {
        return;
    }

    const API_URL = 'https://rickandmortyapi.com/api/character';

    // Function to fetch all characters (handles pagination if needed, though API might handle status directly)
    async function fetchCharacters(statusFilter = 'all') {
        let allCharacters = [];
        let url = API_URL;
        if (statusFilter !== 'all') {
            url = `${API_URL}?status=${statusFilter}`;
        }

        try {
            while (url) {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue satisfactoria');
                }
                const data = await response.json();
                allCharacters = allCharacters.concat(data.results);
                url = data.info.next; // Get the URL for the next page
            }
            return allCharacters;
        } catch (error) {
            console.error('Error al obtener los personajes:', error);
            gallery.innerHTML = '<p style="text-align: center; color: red;">No se pudieron cargar los personajes. Inténtalo de nuevo más tarde.</p>';
            return [];
        }
    }

    // Function to display characters
    function displayCharacters(characters) {
        gallery.innerHTML = ''; // Limpiar el contenedor

        if (characters.length === 0) {
            gallery.innerHTML = '<p style="text-align: center;">No se encontraron personajes con este estado.</p>';
            return;
        }

        characters.forEach(character => {
            const card = document.createElement('div');
            card.classList.add('character-card');

            // Añadir clase según el estado del personaje
            if (character.status === 'Alive') {
                card.classList.add('status-alive');
            } else if (character.status === 'Dead') {
                card.classList.add('status-dead');
            } else {
                card.classList.add('status-unknown');
            }

            card.innerHTML = `
                <img src="${character.image}" alt="Imagen de ${character.name}">
                <div class="card-info">
                    <h2>${character.name}</h2>
                    <p><strong>Estado:</strong> ${character.status}</p>
                    <p><strong>Especie:</strong> ${character.species}</p>
                </div>
            `;
            gallery.appendChild(card);
        });
    }

    // Initial load of characters based on URL parameter or all
    const urlParams = new URLSearchParams(window.location.search);
    const initialStatus = urlParams.get('status') || 'all';
    fetchCharacters(initialStatus).then(displayCharacters);

    // Add event listeners to filter links
    const filterLinks = document.querySelectorAll('.dropdown-content a[data-status]');
    filterLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const status = event.target.dataset.status;
            fetchCharacters(status).then(displayCharacters);
        });
    });
});