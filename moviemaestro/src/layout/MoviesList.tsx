import { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { MovieListItem } from "../components";
import { Movie } from "../types";
import { Fade } from "@mui/material";

interface MoviesListProps {
  movies: Movie[];
  findCompanyById: (id: string) => string | undefined;
  handleRefresh: () => void;
  setSelectedMovie: (movie: Movie) => void;
  setOpenModal: (isOpen: boolean) => void;
}

const randomTimeout = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const averageScore = (movie: Movie): number => {
  if (movie.reviews.length === 0) return 0;
  const sum = movie.reviews.reduce((acc, curr) => acc + curr, 0);
  return sum / movie.reviews.length;
};

export const MoviesList: React.FC<MoviesListProps> = ({
  movies,
  findCompanyById,
  handleRefresh,
  setSelectedMovie,
  setOpenModal,
}) => {
  const [sortMethod, setSortMethod] = useState<
    "title" | "reviewScore" | "company" | "none"
  >("none");

  const sortedMovies = [...movies].sort((a, b) => {
    switch (sortMethod) {
      case "title":
        return a.title.localeCompare(b.title);
      case "reviewScore":
        return averageScore(b) - averageScore(a);

      case "company":
        const companyA = findCompanyById(a.filmCompanyId) || "";
        const companyB = findCompanyById(b.filmCompanyId) || "";
        return companyA.localeCompare(companyB);
      default:
        return 0;
    }
  });

  return (
    <>
      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <Button
          onClick={handleRefresh}
          variant="contained"
          color="secondary"
          startIcon={<RefreshIcon />}
        >
          Refresh
        </Button>
        <FormControl variant="outlined" size="small">
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortMethod}
            onChange={(e) => setSortMethod(e.target.value as any)}
            label="Sort by"
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="reviewScore">Review Score</MenuItem>
            <MenuItem value="company">Movie Company</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Typography mb={1} variant="h3" fontWeight="bold">
        Total movies displayed: {movies.length}
      </Typography>
      <Grid container spacing={3}>
        {sortedMovies.map((movie: Movie) => (
          <Grid item xs={12} md={6} key={movie.id}>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedMovie(movie);
                setOpenModal(true);
              }}
            >
              <Fade in={true} timeout={randomTimeout(100, 1000)}>
                <div>
                  <MovieListItem
                    title={movie.title}
                    reviews={movie.reviews}
                    company={
                      findCompanyById(movie.filmCompanyId) || "Unknown Company"
                    }
                  />
                </div>
              </Fade>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
