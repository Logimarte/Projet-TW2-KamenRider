"use strict";
var data = require('../Data.json');
// Ajouter une série
function addSeries(newSeries) {
    data.series.push(newSeries);
}
// Supprimer une série
function deleteSeries(seriesId) {
    data.series = data.series.filter(function (series) { return series.id !== seriesId; });
}
// Ajouter un épisode à une série existante
function addEpisode(seriesId, newEpisode) {
    var series = data.series.find(function (s) { return s.id === seriesId; });
    if (series) {
        series.episodes.push(newEpisode);
    }
}
// Marquer un épisode comme regardé
function markEpisodeAsWatched(seriesId, episodeId) {
    var series = data.series.find(function (s) { return s.id === seriesId; });
    var episode = series === null || series === void 0 ? void 0 : series.episodes.find(function (e) { return e.id === episodeId; });
    if (episode) {
        episode.watched = true;
    }
}
