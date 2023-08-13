import { render, screen } from "@testing-library/react";
require("@testing-library/jest-dom/extend-expect");
import { MovieListItem } from "../MovieListItem";

describe("MovieListItem", () => {
  const mockProps = {
    title: "Mock Title",
    company: "Mock Company",
    reviews: [7, 8, 9],
  };

  test("renders the movie title correctly", () => {
    render(<MovieListItem {...mockProps} />);
    const titleElement = screen.getByText(mockProps.title);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the movie company correctly", () => {
    render(<MovieListItem {...mockProps} />);
    const companyElement = screen.getByText(mockProps.company);
    expect(companyElement).toBeInTheDocument();
  });

  test("calculates and displays the average review correctly", () => {
    render(<MovieListItem {...mockProps} />);
    const expectedAverage = "8.0";
    const avgReviewElement = screen.getByText(
      `Avg. Review: ${expectedAverage} / 10`
    );
    expect(avgReviewElement).toBeInTheDocument();
  });

  test("handles the edge case of no reviews gracefully", () => {
    const noReviewsProps = {
      ...mockProps,
      reviews: [],
    };
    render(<MovieListItem {...noReviewsProps} />);
    const avgReviewElement = screen.getByText(`Avg. Review: NaN / 10`);
    expect(avgReviewElement).toBeInTheDocument();
  });

  // Further tests could involve checking styles, hover effects, etc. Those would typically require more involved testing utilities or snapshot testing.
});
