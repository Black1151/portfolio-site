import { render, screen, fireEvent } from "@testing-library/react";
import { ReviewForm } from "../ReviewForm";
import { submitReview } from "../../api/api";

jest.mock("../../api/api");

const mockMovie = {
  id: "1",
  title: "Mock Movie",
  reviews: [1, 2, 3],
  filmCompanyId: "1",
};

(submitReview as jest.Mock).mockResolvedValue({ message: "Review submitted!" });

describe("<ReviewForm />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(<ReviewForm selectedMovie={mockMovie} closeForm={jest.fn()} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/review/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit review/i })
    ).toBeInTheDocument();
  });

  it("displays validation errors", async () => {
    render(<ReviewForm selectedMovie={mockMovie} closeForm={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /submit review/i }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Review is required")).toBeInTheDocument();
    expect(
      screen.getByText("Rating should be between 1 and 10")
    ).toBeInTheDocument();
  });

  it("submits the form and displays success dialog", async () => {
    render(<ReviewForm selectedMovie={mockMovie} closeForm={jest.fn()} />);
    fireEvent.input(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.input(screen.getByLabelText(/review/i), {
      target: { value: "Great movie!" },
    });
    fireEvent.click(screen.getByRole("radio", { name: /5/i }));

    fireEvent.click(screen.getByRole("button", { name: /submit review/i }));

    expect(await screen.findByText("Review submitted!")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByText("Review submitted!")).not.toBeInTheDocument();
  });

  it("handles submission error and displays error dialog", async () => {
    (submitReview as jest.Mock).mockRejectedValueOnce(
      new Error("Submission Error")
    );

    render(<ReviewForm selectedMovie={mockMovie} closeForm={jest.fn()} />);
    fireEvent.input(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.input(screen.getByLabelText(/review/i), {
      target: { value: "Great movie!" },
    });
    fireEvent.click(screen.getByRole("radio", { name: /5/i }));

    fireEvent.click(screen.getByRole("button", { name: /submit review/i }));

    expect(
      await screen.findByText(
        "Error submitting review. Please try again later."
      )
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(
      screen.queryByText("Error submitting review. Please try again later.")
    ).not.toBeInTheDocument();
  });
});
