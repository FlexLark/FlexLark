export interface Audio {
  name: string;
  path: string;
  duration?: number;
  cover?: string | string[];
  author?: string | string[];  
  category?: string;
  releaseDate?: Date;
  tags?: string[];
  bitrate?: number;
  sampleRate?: number;

  metaData?: Record<string, any>; 
}