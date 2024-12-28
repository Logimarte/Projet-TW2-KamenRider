"use strict";
// export interface Episode {
//   id: number;
//   title: string;
//   watched: boolean;
// }
// // Interface pour Series
// export interface Series {
//   id: number;
//   title: string;
//   year: number;
//   episodes: Episode[];
// }
// // Exemple de données initiales (à adapter si besoin)
// let data: { series: Series[] } = { series: [] };
// export function addSeries(newSeries: Series): void {
//   data.series.push(newSeries);
// }
// export function deleteSeries(seriesId: number): void {
//   data.series = data.series.filter((series) => series.id !== seriesId);
// }
// export function addEpisode(seriesId: number, newEpisode: Episode): void {
//   const series = data.series.find((s) => s.id === seriesId);
//   if (series) {
//     series.episodes.push(newEpisode);
//   }
// }
// export function markEpisodeAsWatched(seriesId: number, episodeId: number): void {
//   const series = data.series.find((s) => s.id === seriesId);
//   const episode = series?.episodes.find((e) => e.id === episodeId);
//   if (episode) {
//     episode.watched = true;
//   }
// }
// export function getData() {
//   return data;
// }
