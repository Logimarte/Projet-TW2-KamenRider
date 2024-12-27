// console.log('OK')
import { addSeries, deleteSeries, addEpisode, markEpisodeAsWatched, getData } from './models/series';
// Ajouter une nouvelle série
const newSeries = {
  id: 7,
  title: "Kamen Rider X",
  year: 2024,
  episodes: [
    { id: 1, title: "Episode 1: The Beginning", watched: false }
  ]
};
addSeries(newSeries);

// Supprimer une série par ID
deleteSeries(1);

// Ajouter un épisode à une série existante
const newEpisode = { id: 3, title: "Episode 3: The Revelation", watched: false };
addEpisode(7, newEpisode);

// Marquer un épisode comme regardé
markEpisodeAsWatched(7, 3);

// Affichage des données actuelles
console.log(getData());