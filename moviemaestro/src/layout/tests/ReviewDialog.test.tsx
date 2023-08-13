import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ReviewDialog } from "../ReviewDialog";

jest.mock("../../components/ReviewForm", () => {
  return {
    __esModule: true,
    ReviewForm: jest.fn(() => <div data-testid="mockReviewForm" />),
  };
});

describe("ReviewDialog", () => {
  test("displays the title of the selectedMovie", () => {
    render(
      <ReviewDialog
        open={true}
        onClose={() => {}}
        selectedMovie={{ title: "Inception" }}
      />
    );
    expect(screen.getByText("Review for Inception")).toBeInTheDocument();
  });

  test("renders the ReviewForm component", () => {
    render(
      <ReviewDialog
        open={true}
        onClose={() => {}}
        selectedMovie={{ title: "Inception" }}
      />
    );
    expect(screen.getByTestId("mockReviewForm")).toBeInTheDocument();
  });
});
