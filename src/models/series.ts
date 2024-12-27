export interface Episode {
  id: number;
  title: string;
  watched: boolean;
}

// Interface pour Series
export interface Series {
  id: number;
  title: string;
  year: number;
  episodes: Episode[];
}

// Exemple de données (à adapter selon ton fichier de données)
let data: { series: Series[] } = require('../Data.json');

// Fonction pour ajouter une série
export function addSeries(newSeries: Series): void {
  data.series.push(newSeries);
}

// Fonction pour supprimer une série
export function deleteSeries(seriesId: number): void {
  data.series = data.series.filter(series => series.id !== seriesId);
}

// Fonction pour ajouter un épisode
export function addEpisode(seriesId: number, newEpisode: Episode): void {
  const series = data.series.find(s => s.id === seriesId);
  if (series) {
    series.episodes.push(newEpisode);
  }
}

// Fonction pour marquer un épisode comme regardé
export function markEpisodeAsWatched(seriesId: number, episodeId: number): void {
  const series = data.series.find(s => s.id === seriesId);
  const episode = series?.episodes.find(e => e.id === episodeId);
  if (episode) {
    episode.watched = true;
  }
}

// Fonction pour obtenir les données actuelles
export function getData() {
  return data;
}