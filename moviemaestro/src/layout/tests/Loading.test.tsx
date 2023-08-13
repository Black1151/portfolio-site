import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for the "toBeInTheDocument" matcher
import { Loading } from "../Loading";

describe("Loading", () => {
  test("renders without crashing", () => {
    render(<Loading />);
  });

  test("displays the CircularProgress component", () => {
    render(<Loading />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
