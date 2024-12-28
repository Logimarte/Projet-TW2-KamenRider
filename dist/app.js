"use strict";
var data = { series: [] };
// Charger les données depuis un fichier JSON (simulé)
function loadSeriesData() {
    fetch('src/Data.json')
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Erreur réseau : ' + response.statusText);
        }
        return response.json();
    })
        .then(function (jsonData) {
        data = jsonData;
        displaySeries();
        populateSeriesDropdown();
        populateDeletionDropdowns();
    })
        .catch(function (error) {
        console.error('Erreur lors du chargement des données :', error);
    });
}
// Afficher les séries et leurs épisodes
function displaySeries() {
    var appDiv = document.getElementById('app');
    if (!appDiv) {
        console.error('Élément avec ID "app" introuvable.');
        return;
    }
    appDiv.innerHTML = '';
    if (data.series.length === 0) {
        appDiv.innerHTML = 'Aucune série à afficher.';
        return;
    }
    data.series.forEach(function (serie) {
        var serieElement = document.createElement('div');
        serieElement.classList.add('serie');
        serieElement.innerHTML = "\n      <h3>".concat(serie.title, " (").concat(serie.year, ")</h3>\n      <ul>\n        ").concat(serie.episodes
            .map(function (episode) {
            return "<li>".concat(episode.title, " - ").concat(episode.watched ? 'Vu' : 'Non vu', "</li>");
        })
            .join(''), "\n      </ul>\n    ");
        appDiv.appendChild(serieElement);
    });
}
// Menus déroulants avec les séries existantes
function populateSeriesDropdown() {
    var dropdown = document.getElementById('episodeSeries');
    dropdown.innerHTML = '';
    data.series.forEach(function (serie) {
        var option = document.createElement('option');
        option.value = serie.title;
        option.textContent = serie.title;
        dropdown.appendChild(option);
    });
}
// Menus déroulants pour la suppression
function populateDeletionDropdowns() {
    var deleteSeriesDropdown = document.getElementById('deleteSeries');
    var deleteEpisodeSeriesDropdown = document.getElementById('deleteEpisodeSeries');
    deleteSeriesDropdown.innerHTML = '';
    deleteEpisodeSeriesDropdown.innerHTML = '';
    data.series.forEach(function (serie) {
        var option = document.createElement('option');
        option.value = serie.title;
        option.textContent = serie.title;
        deleteSeriesDropdown.appendChild(option);
        var episodeSeriesOption = document.createElement('option');
        episodeSeriesOption.value = serie.title;
        episodeSeriesOption.textContent = serie.title;
        deleteEpisodeSeriesDropdown.appendChild(episodeSeriesOption);
    });
    // Remplir les épisodes lors de la sélection de la série pour la suppression d'épisode
    deleteEpisodeSeriesDropdown.addEventListener('change', function () {
        var seriesTitle = deleteEpisodeSeriesDropdown.value;
        var selectedSeries = data.series.find(function (s) { return s.title === seriesTitle; });
        var deleteEpisodeDropdown = document.getElementById('deleteEpisode');
        deleteEpisodeDropdown.innerHTML = '';
        if (selectedSeries) {
            selectedSeries.episodes.forEach(function (episode) {
                var option = document.createElement('option');
                option.value = episode.id.toString();
                option.textContent = episode.title;
                deleteEpisodeDropdown.appendChild(option);
            });
        }
    });
}
// Ajouter une série
function addSeries(newSeries) {
    newSeries.id = data.series.length + 1;
    data.series.push(newSeries);
    displaySeries();
    populateSeriesDropdown();
    populateDeletionDropdowns(); // Mettre à jour les menus déroulants après ajout
}
// Ajouter un épisode à une série
function addEpisode(seriesTitle, newEpisode) {
    var series = data.series.find(function (s) { return s.title === seriesTitle; });
    if (series) {
        newEpisode.id = series.episodes.length + 1;
        series.episodes.push(newEpisode);
        displaySeries();
    }
}
// Supprimer une série
function deleteSeries(seriesTitle) {
    var seriesIndex = data.series.findIndex(function (s) { return s.title === seriesTitle; });
    if (seriesIndex !== -1) {
        data.series.splice(seriesIndex, 1);
        displaySeries();
        populateSeriesDropdown();
        populateDeletionDropdowns();
    }
}
// Supprimer un épisode d'une série
function deleteEpisode(seriesTitle, episodeId) {
    var series = data.series.find(function (s) { return s.title === seriesTitle; });
    if (series) {
        var episodeIndex = series.episodes.findIndex(function (e) { return e.id === episodeId; });
        if (episodeIndex !== -1) {
            series.episodes.splice(episodeIndex, 1);
            displaySeries();
        }
    }
}
// Formulaire pour ajouter une série
var addSeriesForm = document.getElementById('addSeriesForm');
if (addSeriesForm) {
    addSeriesForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var title = document.getElementById('seriesTitle').value;
        var year = parseInt(document.getElementById('seriesYear').value, 10);
        var newSeries = {
            id: data.series.length + 1,
            title: title,
            year: year,
            episodes: [],
        };
        addSeries(newSeries);
        addSeriesForm.reset();
    });
}
// Formulaire pour ajouter un épisode
var addEpisodeForm = document.getElementById('addEpisodeForm');
if (addEpisodeForm) {
    addEpisodeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var seriesTitle = document.getElementById('episodeSeries').value;
        var episodeTitle = document.getElementById('episodeTitle').value;
        var newEpisode = {
            id: 0,
            title: episodeTitle,
            watched: false,
        };
        addEpisode(seriesTitle, newEpisode);
        addEpisodeForm.reset();
    });
}
// Formulaire pour supprimer une série
var deleteSeriesForm = document.getElementById('deleteSeriesForm');
if (deleteSeriesForm) {
    deleteSeriesForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var seriesTitle = document.getElementById('deleteSeries').value;
        deleteSeries(seriesTitle);
    });
}
// Formulaire pour supprimer un épisode
var deleteEpisodeForm = document.getElementById('deleteEpisodeForm');
if (deleteEpisodeForm) {
    deleteEpisodeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var seriesTitle = document.getElementById('deleteEpisodeSeries').value;
        var episodeId = parseInt(document.getElementById('deleteEpisode').value, 10);
        deleteEpisode(seriesTitle, episodeId);
    });
}
// Charger les séries au démarrage
loadSeriesData();
