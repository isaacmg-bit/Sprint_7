export interface MovieCrewApi {
  id: number;

  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string;
  }[];

  crew: {
    id: number;
    name: string;
    job: string;
    profile_path: string;
  }[];
}
