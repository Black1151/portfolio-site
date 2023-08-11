export interface Movie {
  id: string;
  reviews: number[];
  title: string;
  filmCompanyId: string;
  cost: number;
  releaseYear: number;
}

export interface ReviewResponse {
  success: boolean;
  message: string;
}

export interface MovieCompany {
  id: string;
  name: string;
}

export interface Review {
  movieId: string;
  message: string;
  rating: number;
  name: string;
}

export interface ReviewResponse {
  message: string;
}
