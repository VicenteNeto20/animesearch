document.addEventListener('DOMContentLoaded', function () {
    const animeListElement = document.querySelector('.anime-list');
  
    function showAnimeList(animeData) {
      animeListElement.innerHTML = '';
  
      animeData.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.classList.add('anime-card');
  
        const animeImage = document.createElement('img');
        animeImage.src = anime.attributes.posterImage.medium;
        animeImage.alt = anime.attributes.titles.en || anime.attributes.titles.en_jp || anime.attributes.canonicalTitle;
  
        const animeCardContent = document.createElement('div');
        animeCardContent.classList.add('anime-card-content');
  
        const animeTitle = document.createElement('h2');
        animeTitle.textContent = anime.attributes.titles.en || anime.attributes.titles.en_jp || anime.attributes.canonicalTitle;
  
        const animeYear = document.createElement('p');
        const releaseDate = new Date(anime.attributes.startDate);
        const formattedDate = releaseDate.toLocaleDateString('pt-BR', { year: 'numeric' });
        animeYear.textContent = `Ano de lançamento: ${formattedDate}`;
        animeYear.classList.add('anime-card-ano');
  
        animeCardContent.appendChild(animeTitle);
        animeCardContent.appendChild(animeYear);
  
        animeCard.appendChild(animeImage);
        animeCard.appendChild(animeCardContent);
  
        animeListElement.appendChild(animeCard);
      });
    }
  
    function fetchTopAnimes() {
      fetch('https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=10')
        .then(response => response.json())
        .then(data => {
          const topAnimeData = data.data;
          showAnimeList(topAnimeData);
        })
        .catch(error => {
          console.error('Erro ao buscar os top animes:', error);
        });
    }
  
    // Chama a função para buscar os top 10 animes assim que a página é carregada
    fetchTopAnimes();
  
    // Adicione o evento de submit ao formulário existente
    const form = document.querySelector('.search-anime');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const searchTerm = document.querySelector('.search-anime-input').value.trim();
      if (searchTerm !== '') {
        searchAnime(searchTerm);
      }
    });
  
    function searchAnime(term) {
      fetch(`https://kitsu.io/api/edge/anime?filter[text]=${term}`)
        .then(response => response.json())
        .then(data => {
          const animeData = data.data;
          showAnimeList(animeData);
        })
        .catch(error => {
          console.error('Erro ao buscar os animes:', error);
        });
    }
  });
  