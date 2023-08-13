import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MoviesList } from "../MoviesList";

describe("MoviesList", () => {
  const mockMovies = [
    {
      id: "1",
      title: "Movie A",
      reviews: [4, 5],
      filmCompanyId: "c1",
    },
    {
      id: "2",
      title: "Movie B",
      reviews: [3],
      filmCompanyId: "c2",
    },
  ];

  const mockFindCompanyById = jest.fn();
  mockFindCompanyById.mockImplementation((id) => {
    if (id === "c1") return "Company A";
    if (id === "c2") return "Company B";
  });

  const mockSetSelectedMovie = jest.fn();
  const mockSetOpenModal = jest.fn();
  const mockHandleRefresh = jest.fn();

  beforeEach(() => {
    render(
      <MoviesList
        movies={mockMovies}
        findCompanyById={mockFindCompanyById}
        handleRefresh={mockHandleRefresh}
        setSelectedMovie={mockSetSelectedMovie}
        setOpenModal={mockSetOpenModal}
      />
    );
  });

  test("renders without crashing", () => {
    expect(screen.getByText("Total movies displayed: 2")).toBeInTheDocument();
  });

  test("displays movies with correct details", () => {
    expect(screen.getByText("Movie A")).toBeInTheDocument();
    expect(screen.getByText("Company A")).toBeInTheDocument();

    expect(screen.getByText("Movie B")).toBeInTheDocument();
    expect(screen.getByText("Company B")).toBeInTheDocument();
  });

  test("opens modal on movie click", () => {
    const movieElement = screen.getByText("Movie A");
    fireEvent.click(movieElement);
    expect(mockSetSelectedMovie).toHaveBeenCalledWith(mockMovies[0]);
    expect(mockSetOpenModal).toHaveBeenCalledWith(true);
  });
});
