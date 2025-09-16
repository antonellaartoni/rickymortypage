document.addEventListener('DOMContentLoaded', () => {
    const seasonsContainer = document.getElementById('seasons-container');
    if (!seasonsContainer) return;

    const API_URL = 'https://rickandmortyapi.com/api/episode';

    // Función para obtener todos los episodios (maneja paginación)
    async function fetchAllEpisodes(url) {
        let episodes = [];
        let nextUrl = url;

        while (nextUrl) {
            const response = await fetch(nextUrl);
            const data = await response.json();
            episodes = episodes.concat(data.results);
            nextUrl = data.info.next;
        }

        return episodes;
    }

    fetchAllEpisodes(API_URL)
        .then(episodes => {
            // Agrupar episodios por temporada
            const seasons = episodes.reduce((acc, episode) => {
                // Extract season number (e.g., S01 -> 1, S02 -> 2)
                const seasonNumber = parseInt(episode.episode.substring(1, 3), 10);
                if (!acc[seasonNumber]) {
                    acc[seasonNumber] = [];
                }
                acc[seasonNumber].push(episode);
                return acc;
            }, {});

            seasonsContainer.innerHTML = ''; // Limpiar contenedor

            // Get season from URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            const requestedSeason = parseInt(urlParams.get('season'), 10);

            let seasonsToRender = {};

            if (requestedSeason && seasons[requestedSeason]) {
                // If a specific season is requested and exists, render only that one
                seasonsToRender[requestedSeason] = seasons[requestedSeason];
            } else {
                // Otherwise, render all seasons
                seasonsToRender = seasons;
            }

            // Render each season
            for (const season in seasonsToRender) {
                const seasonBlock = document.createElement('div');
                seasonBlock.classList.add('season-block');

                const seasonTitle = document.createElement('h2');
                seasonTitle.textContent = `Temporada ${parseInt(season, 10)}`;
                seasonBlock.appendChild(seasonTitle);

                const episodeList = document.createElement('ul');
                episodeList.classList.add('episode-list');

                seasonsToRender[season].forEach(ep => {
                    const episodeItem = document.createElement('li');
                    episodeItem.innerHTML = `<strong>${ep.episode}:</strong> ${ep.name} <span>(Estreno: ${ep.air_date})</span>`;
                    episodeList.appendChild(episodeItem);
                });

                seasonBlock.appendChild(episodeList);
                seasonsContainer.appendChild(seasonBlock);
            }
        })
        .catch(error => {
            console.error('Error al obtener los episodios:', error);
            seasonsContainer.innerHTML = '<p style="text-align: center; color: red;">No se pudieron cargar las temporadas.</p>';
        });
});