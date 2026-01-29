export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  release_date: string;
  adult: boolean;
  genresText: string;
  origin_country: string;
  overview: string;
  runtime: number;
  vote_average: number;
}
