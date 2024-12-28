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

let data: Data = { series: [] };

// Charger les données depuis un fichier JSON (simulé)
function loadSeriesData(): void {
  fetch('src/Data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erreur réseau : ' + response.statusText);
      }
      return response.json();
    })
    .then((jsonData: Data) => {
      data = jsonData;  
      displaySeries();
      populateSeriesDropdown();
      populateDeletionDropdowns();
    })
    .catch((error: Error) => {
      console.error('Erreur lors du chargement des données :', error);
    });
}

// Afficher les séries et leurs épisodes
function displaySeries(): void {
  const appDiv = document.getElementById('app');
  if (!appDiv) {
    console.error('Élément avec ID "app" introuvable.');
    return;
  }

  appDiv.innerHTML = ''; // Vide l'élément avant d'ajouter le contenu

  if (data.series.length === 0) {
    appDiv.innerHTML = 'Aucune série à afficher.';
    return;
  }

  data.series.forEach((serie) => {
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

// Remplir les menus déroulants avec les séries existantes
function populateSeriesDropdown(): void {
  const dropdown = document.getElementById('episodeSeries') as HTMLSelectElement;
  dropdown.innerHTML = '';

  data.series.forEach((serie) => {
    const option = document.createElement('option');
    option.value = serie.title;
    option.textContent = serie.title;
    dropdown.appendChild(option);
  });
}

// Remplir les menus déroulants pour la suppression
function populateDeletionDropdowns(): void {
  const deleteSeriesDropdown = document.getElementById('deleteSeries') as HTMLSelectElement;
  const deleteEpisodeSeriesDropdown = document.getElementById('deleteEpisodeSeries') as HTMLSelectElement;

  deleteSeriesDropdown.innerHTML = '';
  deleteEpisodeSeriesDropdown.innerHTML = '';

  data.series.forEach((serie) => {
    const option = document.createElement('option');
    option.value = serie.title;
    option.textContent = serie.title;
    deleteSeriesDropdown.appendChild(option);

    const episodeSeriesOption = document.createElement('option');
    episodeSeriesOption.value = serie.title;
    episodeSeriesOption.textContent = serie.title;
    deleteEpisodeSeriesDropdown.appendChild(episodeSeriesOption);
  });

  // Remplir les épisodes lors de la sélection de la série pour la suppression d'épisode
  deleteEpisodeSeriesDropdown.addEventListener('change', () => {
    const seriesTitle = deleteEpisodeSeriesDropdown.value;
    const selectedSeries = data.series.find((s) => s.title === seriesTitle);
    const deleteEpisodeDropdown = document.getElementById('deleteEpisode') as HTMLSelectElement;

    deleteEpisodeDropdown.innerHTML = '';

    if (selectedSeries) {
      selectedSeries.episodes.forEach((episode) => {
        const option = document.createElement('option');
        option.value = episode.id.toString();
        option.textContent = episode.title;
        deleteEpisodeDropdown.appendChild(option);
      });
    }
  });
}

// Ajouter une série
function addSeries(newSeries: Series): void {
  newSeries.id = data.series.length + 1;
  data.series.push(newSeries);
  displaySeries();
  populateSeriesDropdown();
  populateDeletionDropdowns(); // Mettre à jour les menus déroulants après ajout
}

// Ajouter un épisode à une série
function addEpisode(seriesTitle: string, newEpisode: Episode): void {
  const series = data.series.find((s) => s.title === seriesTitle);
  if (series) {
    newEpisode.id = series.episodes.length + 1;
    series.episodes.push(newEpisode);
    displaySeries();
  }
}

// Supprimer une série
function deleteSeries(seriesTitle: string): void {
  const seriesIndex = data.series.findIndex((s) => s.title === seriesTitle);
  if (seriesIndex !== -1) {
    data.series.splice(seriesIndex, 1);
    displaySeries();
    populateSeriesDropdown();
    populateDeletionDropdowns();
  }
}

// Supprimer un épisode d'une série
function deleteEpisode(seriesTitle: string, episodeId: number): void {
  const series = data.series.find((s) => s.title === seriesTitle);
  if (series) {
    const episodeIndex = series.episodes.findIndex((e) => e.id === episodeId);
    if (episodeIndex !== -1) {
      series.episodes.splice(episodeIndex, 1);
      displaySeries();
    }
  }
}

// Formulaire pour ajouter une série
const addSeriesForm = document.getElementById('addSeriesForm') as HTMLFormElement;
if (addSeriesForm) {
  addSeriesForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = (document.getElementById('seriesTitle') as HTMLInputElement).value;
    const year = parseInt((document.getElementById('seriesYear') as HTMLInputElement).value, 10);

    const newSeries: Series = {
      id: data.series.length + 1,
      title,
      year,
      episodes: [],
    };

    addSeries(newSeries);
    addSeriesForm.reset();
  });
}

// Formulaire pour ajouter un épisode
const addEpisodeForm = document.getElementById('addEpisodeForm') as HTMLFormElement;
if (addEpisodeForm) {
  addEpisodeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const seriesTitle = (document.getElementById('episodeSeries') as HTMLSelectElement).value;
    const episodeTitle = (document.getElementById('episodeTitle') as HTMLInputElement).value;

    const newEpisode: Episode = {
      id: 0, 
      title: episodeTitle,
      watched: false,
    };

    addEpisode(seriesTitle, newEpisode);
    addEpisodeForm.reset();
  });
}

// Formulaire pour supprimer une série
const deleteSeriesForm = document.getElementById('deleteSeriesForm') as HTMLFormElement;
if (deleteSeriesForm) {
  deleteSeriesForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const seriesTitle = (document.getElementById('deleteSeries') as HTMLSelectElement).value;
    deleteSeries(seriesTitle);
  });
}

// Formulaire pour supprimer un épisode
const deleteEpisodeForm = document.getElementById('deleteEpisodeForm') as HTMLFormElement;
if (deleteEpisodeForm) {
  deleteEpisodeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const seriesTitle = (document.getElementById('deleteEpisodeSeries') as HTMLSelectElement).value;
    const episodeId = parseInt((document.getElementById('deleteEpisode') as HTMLSelectElement).value, 10);
    deleteEpisode(seriesTitle, episodeId);
  });
}

// Charger les séries au démarrage
loadSeriesData();
