export interface CastMember {
  id: number;
  name: string;
  character: string;
  pic: string;
}

export interface MovieCrew {
  id: number;
  cast: CastMember[];
  crewName: string;
  crewPic: string;
  crewRole: string;
}
