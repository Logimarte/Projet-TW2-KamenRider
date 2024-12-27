interface Episode {
    id: number;
    title: string;
    watched: boolean;
  }
  
  interface Series {
    id: number;
    title: string;
    year: number;
    episodes: Episode[];
  }
  
  interface Data {
    series: Series[];
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour récupérer les données JSON et les afficher
    function loadSeriesData(): void {
      fetch('src/Data.json') // Assurez-vous que le chemin vers le fichier JSON est correct
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur réseau : ' + response.statusText);
          }
          return response.json();
        })
        .then((data: Data) => {
          console.log('Données chargées avec succès', data);
          displaySeries(data.series);
        })
        .catch((error: Error) => {
          console.error('Erreur lors du chargement des données :', error);
          const appDiv = document.getElementById('app');
          if (appDiv) {
            appDiv.innerHTML =
              'Impossible de charger les données. Veuillez réessayer plus tard.';
          }
        });
    }
  
    // Fonction pour afficher les séries et leurs épisodes
    function displaySeries(series: Series[]): void {
      const appDiv = document.getElementById('app');
      if (!appDiv) {
        console.error('Élément avec ID "app" introuvable.');
        return;
      }
  
      appDiv.innerHTML = ''; // Vide l'élément avant d'ajouter le contenu
  
      if (series.length === 0) {
        appDiv.innerHTML = 'Aucune série à afficher.';
        return;
      }
  
      series.forEach((serie) => {
        // Créer un élément pour chaque série
        const serieElement = document.createElement('div');
        serieElement.classList.add('serie');
        serieElement.innerHTML = `
          <h3>${serie.title} (${serie.year})</h3>
          <ul>
            ${serie.episodes
              .map(
                (episode) =>
                  `<li>${episode.title} - ${
                    episode.watched ? 'Vu' : 'Non vu'
                  }</li>`
              )
              .join('')}
          </ul>
        `;
        appDiv.appendChild(serieElement);
      });
    }
  
    // Charger les données lorsque la page est prête
    loadSeriesData();
  });