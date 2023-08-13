import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Header } from "../Header";

describe("Header", () => {
  test("renders without crashing", () => {
    render(<Header />);
  });

  test("displays the main heading and subheading with correct content", () => {
    render(<Header />);

    expect(screen.getByText("Want to have your say?")).toBeInTheDocument();
    expect(
      screen.getByText("Select from the movies below to give us your thoughts!")
    ).toBeInTheDocument();
  });

  test("utilizes the Slide animation and renders after load", async () => {
    render(<Header />);
    expect(
      await screen.findByText("Want to have your say?")
    ).toBeInTheDocument();
  });
});
