
export interface SolarMapConfig {
  center: [number, number]; // [longitude, latitude]
  zoom: number;
  style: string;
  token?: string;
}

export interface SolarPoint {
  lat: number;
  lng: number;
  intensity: number; // 0-1, representa a intensidade solar relativa
  location?: string;
}

export interface HeatmapData {
  points: SolarPoint[];
  regionName: string;
  averageIntensity: number;
}
