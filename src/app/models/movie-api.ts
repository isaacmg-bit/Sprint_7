export interface MovieApi {
  backdrop_path: string;
  id: number;
  title: string;
  release_date: string;
  adult: boolean;
  genres: [
    {
      name: string;
    },
  ];
  origin_country: string;
  overview: string;
  runtime: number;
  vote_average: number;
}
