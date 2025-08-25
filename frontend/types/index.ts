export interface Country {
  name: string;
  cities: string[];
}

export interface CityData {
  countries: Country[];
}

export interface NeighborhoodMatch {
  neighborhood1: string;
  neighborhood1_description: string;
  neighborhood2: string;
  neighborhood2_description: string;
  similarity_reason: string;
  characteristics: string[];
  image1?: string;
  image2?: string;
  maps_link1: string;
  maps_link2: string;
}

export interface StreamResponse {
  status: 'processing' | 'match' | 'complete' | 'error';
  message?: string;
  data?: NeighborhoodMatch;
  index?: number;
  total?: number;
}