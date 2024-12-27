"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// console.log('OK')
var series_1 = require("./models/series");
// Ajouter une nouvelle série
var newSeries = {
    id: 7,
    title: "Kamen Rider X",
    year: 2024,
    episodes: [
        { id: 1, title: "Episode 1: The Beginning", watched: false }
    ]
};
(0, series_1.addSeries)(newSeries);
// Supprimer une série par ID
(0, series_1.deleteSeries)(1);
// Ajouter un épisode à une série existante
var newEpisode = { id: 3, title: "Episode 3: The Revelation", watched: false };
(0, series_1.addEpisode)(7, newEpisode);
// Marquer un épisode comme regardé
(0, series_1.markEpisodeAsWatched)(7, 3);
// Affichage des données actuelles
console.log((0, series_1.getData)());
