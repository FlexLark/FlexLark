import { Audio } from "./Audio";

export interface Playlist {  
  id: string;
  name: string; 
  creator: string;  
  songs: Array<Audio>;  
  isPublic: boolean;
  createdAt: Date;
  updatedAt?: Date;
  description?: string;
  
  metaData?: Record<string, any>;
}