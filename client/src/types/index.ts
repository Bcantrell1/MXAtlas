export interface Track {
  id: number;
  name: string;
  location: string;
  country: string;
  type: string;
  difficulty: string;
  longitude: number;
  latitude: number;
  elevation: number;
  track_length: string;
  features: string[];
  capacity: number;
  established: number;
  description: string;
}