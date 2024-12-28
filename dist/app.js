"use strict";
document.addEventListener('DOMContentLoaded', function () {
    // Charger les séries depuis le fichier JSON
    function loadSeriesData() {
        fetch('src/Data.json')
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Erreur réseau : ' + response.statusText);
            }
            return response.json();
        })
            .then(function (data) {
            displaySeries(data.series);
            // Ajout des manipulations de données ici
            var newSeries = {
                id: 7,
                title: "Kamen Rider X",
                year: 2024,
                episodes: [
                    { id: 1, title: "Episode 1: The Beginning", watched: false }
                ]
            };
            addSeries(data, newSeries);
            var newEpisode = { id: 3, title: "Episode 3: The Revelation", watched: false };
            addEpisode(data, 7, newEpisode);
            markEpisodeAsWatched(data, 7, 3);
            console.log(getData(data));
        })
            .catch(function (error) {
            console.error('Erreur lors du chargement des données :', error);
            var appDiv = document.getElementById('app');
            if (appDiv) {
                appDiv.innerHTML = 'Impossible de charger les données. Veuillez réessayer plus tard.';
            }
        });
    }
    // Fonction pour afficher les séries et leurs épisodes
    function displaySeries(series) {
        var appDiv = document.getElementById('app');
        if (!appDiv) {
            console.error('Élément avec ID "app" introuvable.');
            return;
        }
        appDiv.innerHTML = ''; // Vide l'élément avant d'ajouter le contenu
        if (series.length === 0) {
            appDiv.innerHTML = 'Aucune série à afficher.';
            return;
        }
        series.forEach(function (serie) {
            var serieElement = document.createElement('div');
            serieElement.classList.add('serie');
            serieElement.innerHTML = "\n        <h3>".concat(serie.title, " (").concat(serie.year, ")</h3>\n        <ul>\n          ").concat(serie.episodes
                .map(function (episode) {
                return "<li>".concat(episode.title, " - ").concat(episode.watched ? 'Vu' : 'Non vu', "</li>");
            })
                .join(''), "\n        </ul>\n      ");
            appDiv.appendChild(serieElement);
        });
    }
    // Fonction pour ajouter une série
    function addSeries(data, newSeries) {
        data.series.push(newSeries);
    }
    // Fonction pour ajouter un épisode à une série
    function addEpisode(data, seriesId, newEpisode) {
        var series = data.series.find(function (s) { return s.id === seriesId; });
        if (series) {
            series.episodes.push(newEpisode);
        }
    }
    // Fonction pour marquer un épisode comme regardé
    function markEpisodeAsWatched(data, seriesId, episodeId) {
        var series = data.series.find(function (s) { return s.id === seriesId; });
        var episode = series === null || series === void 0 ? void 0 : series.episodes.find(function (e) { return e.id === episodeId; });
        if (episode) {
            episode.watched = true;
        }
    }
    // Fonction pour obtenir les données actuelles
    function getData(data) {
        return data;
    }
    loadSeriesData(); // Charger les données au démarrage
});
