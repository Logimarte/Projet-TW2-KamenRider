"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour récupérer les données JSON et les afficher
    function loadSeriesData() {
        fetch('src/Data.json') // Assurez-vous que le chemin vers le fichier JSON est correct
            .then((response) => {
            if (!response.ok) {
                throw new Error('Erreur réseau : ' + response.statusText);
            }
            return response.json();
        })
            .then((data) => {
            console.log('Données chargées avec succès', data);
            displaySeries(data.series);
        })
            .catch((error) => {
            console.error('Erreur lors du chargement des données :', error);
            const appDiv = document.getElementById('app');
            if (appDiv) {
                appDiv.innerHTML =
                    'Impossible de charger les données. Veuillez réessayer plus tard.';
            }
        });
    }
    // Fonction pour afficher les séries et leurs épisodes
    function displaySeries(series) {
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
                .map((episode) => `<li>${episode.title} - ${episode.watched ? 'Vu' : 'Non vu'}</li>`)
                .join('')}
          </ul>
        `;
            appDiv.appendChild(serieElement);
        });
    }
    // Charger les données lorsque la page est prête
    loadSeriesData();
});
