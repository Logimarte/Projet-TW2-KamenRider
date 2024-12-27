"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSeries = addSeries;
exports.deleteSeries = deleteSeries;
exports.addEpisode = addEpisode;
exports.markEpisodeAsWatched = markEpisodeAsWatched;
exports.getData = getData;
// Exemple de données (à adapter selon ton fichier de données)
let data = require('../Data.json');
// Fonction pour ajouter une série
function addSeries(newSeries) {
    data.series.push(newSeries);
}
// Fonction pour supprimer une série
function deleteSeries(seriesId) {
    data.series = data.series.filter(series => series.id !== seriesId);
}
// Fonction pour ajouter un épisode
function addEpisode(seriesId, newEpisode) {
    const series = data.series.find(s => s.id === seriesId);
    if (series) {
        series.episodes.push(newEpisode);
    }
}
// Fonction pour marquer un épisode comme regardé
function markEpisodeAsWatched(seriesId, episodeId) {
    const series = data.series.find(s => s.id === seriesId);
    const episode = series === null || series === void 0 ? void 0 : series.episodes.find(e => e.id === episodeId);
    if (episode) {
        episode.watched = true;
    }
}
// Fonction pour obtenir les données actuelles
function getData() {
    return data;
}
