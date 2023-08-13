// Navbar.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Navbar } from "../Navbar";

jest.mock("../../svg/Logo", () => {
  return {
    __esModule: true,
    Logo: jest.fn(() => <div data-testid="mockLogo" />),
  };
});

describe("Navbar", () => {
  test("renders without crashing", () => {
    render(<Navbar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("displays the Logo component", () => {
    render(<Navbar />);

    expect(screen.getByTestId("mockLogo")).toBeInTheDocument();
  });
});
