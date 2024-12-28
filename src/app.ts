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
  // Charger les séries depuis le fichier JSON
  function loadSeriesData(): void {
    fetch('src/Data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur réseau : ' + response.statusText);
        }
        return response.json();
      })
      .then((data: Data) => {
        displaySeries(data.series);
        // Ajout des manipulations de données ici
        const newSeries: Series = {
          id: 7,
          title: "Kamen Rider X",
          year: 2024,
          episodes: [
            { id: 1, title: "Episode 1: The Beginning", watched: false }
          ]
        };
        addSeries(data, newSeries);
        const newEpisode: Episode = { id: 3, title: "Episode 3: The Revelation", watched: false };
        addEpisode(data, 7, newEpisode);
        markEpisodeAsWatched(data, 7, 3);
        console.log(getData(data));
      })
      .catch((error: Error) => {
        console.error('Erreur lors du chargement des données :', error);
        const appDiv = document.getElementById('app');
        if (appDiv) {
          appDiv.innerHTML = 'Impossible de charger les données. Veuillez réessayer plus tard.';
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
      const serieElement = document.createElement('div');
      serieElement.classList.add('serie');
      serieElement.innerHTML = `
        <h3>${serie.title} (${serie.year})</h3>
        <ul>
          ${serie.episodes
            .map(
              (episode) =>
                `<li>${episode.title} - ${episode.watched ? 'Vu' : 'Non vu'}</li>`
            )
            .join('')}
        </ul>
      `;
      appDiv.appendChild(serieElement);
    });
  }

  // Fonction pour ajouter une série
  function addSeries(data: Data, newSeries: Series): void {
    data.series.push(newSeries);
  }

  // Fonction pour ajouter un épisode à une série
  function addEpisode(data: Data, seriesId: number, newEpisode: Episode): void {
    const series = data.series.find((s) => s.id === seriesId);
    if (series) {
      series.episodes.push(newEpisode);
    }
  }

  // Fonction pour marquer un épisode comme regardé
  function markEpisodeAsWatched(data: Data, seriesId: number, episodeId: number): void {
    const series = data.series.find((s) => s.id === seriesId);
    const episode = series?.episodes.find((e) => e.id === episodeId);
    if (episode) {
      episode.watched = true;
    }
  }

  // Fonction pour obtenir les données actuelles
  function getData(data: Data): Data {
    return data;
  }

  loadSeriesData(); // Charger les données au démarrage
});