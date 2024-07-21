import { Audio } from "./Audio";

export interface Album {  
  id: string;
  name: string;
  artist: string | string[];
  releaseDate: Date;
  coverImage: string;
  songs: Array<Audio>;
  
  metaData?: Record<string, any>;
}