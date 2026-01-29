export interface MovieCrewApi {
  cast: [
    {
      name: string;
      profile_path: string;
    },
  ];
  crew: [
    {
      name: string;
      profile_path: string;
      department: string;
    },
  ];
}
