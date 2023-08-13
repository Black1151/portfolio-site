import axios from "axios";
import { MovieCompany, Movie, Review, ReviewResponse } from "../types";

const BASE_URL =
  "https://comforting-starlight-f3456a.netlify.app/.netlify/functions";
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  }
);

export const getMovieCompanies = async (): Promise<MovieCompany[]> => {
  console.log(BASE_URL + "/movieCompanies");

  const response = await apiClient.get("/movieCompanies");
  return response.data;
};

export const getMovies = async (): Promise<Movie[]> => {
  const response = await apiClient.get("/movies");
  return response.data;
};

export const submitReview = async (
  submission: Review
): Promise<ReviewResponse> => {
  const response = await apiClient.post("/submitReview", submission);
  return response.data;
};
