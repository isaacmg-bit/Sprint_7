export interface MovieCrewApi {
  id: number;
  cast: [
    {
      name: string;
      profile_path: string;
      character: string;
    },
  ];
  crew: [
    {
      name: string;
      profile_path: string;
      job: string;
    },
  ];
}
