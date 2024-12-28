"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSeries = addSeries;
exports.deleteSeries = deleteSeries;
exports.addEpisode = addEpisode;
exports.markEpisodeAsWatched = markEpisodeAsWatched;
exports.getData = getData;
// Exemple de données initiales (à adapter si besoin)
var data = { series: [] };
function addSeries(newSeries) {
    data.series.push(newSeries);
}
function deleteSeries(seriesId) {
    data.series = data.series.filter(function (series) { return series.id !== seriesId; });
}
function addEpisode(seriesId, newEpisode) {
    var series = data.series.find(function (s) { return s.id === seriesId; });
    if (series) {
        series.episodes.push(newEpisode);
    }
}
function markEpisodeAsWatched(seriesId, episodeId) {
    var series = data.series.find(function (s) { return s.id === seriesId; });
    var episode = series === null || series === void 0 ? void 0 : series.episodes.find(function (e) { return e.id === episodeId; });
    if (episode) {
        episode.watched = true;
    }
}
function getData() {
    return data;
}
