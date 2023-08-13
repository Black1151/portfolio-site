import { useState, useEffect } from "react";
import { Movie, MovieCompany } from "./types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { getMovieCompanies, getMovies } from "./api/api";
import {
  Header,
  Navbar,
  ErrorComponent,
  Loading,
  MoviesList,
  ReviewDialog,
} from "./layout";

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [companies, setCompanies] = useState<MovieCompany[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleRefresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const movies = await getMovies();
      setMovies(movies);
      const companies = await getMovieCompanies();
      setCompanies(companies);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    }
    setIsLoading(false);
  };

  const findCompanyById = (id: string) => {
    if (companies[0]) {
      const foundCompany = companies.find((company) => company.id === id);
      return foundCompany?.name;
    }
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorComponent error={error} handleRefresh={handleRefresh} />
      ) : (
        <>
          <Header />
          <Container>
            <Box my={4}>
              <MoviesList
                movies={movies}
                findCompanyById={findCompanyById}
                handleRefresh={handleRefresh}
                setSelectedMovie={setSelectedMovie}
                setOpenModal={setOpenModal}
              />
            </Box>
            <ReviewDialog
              open={openModal}
              onClose={() => setOpenModal(false)}
              selectedMovie={selectedMovie}
            />
          </Container>
        </>
      )}
    </>
  );
};
