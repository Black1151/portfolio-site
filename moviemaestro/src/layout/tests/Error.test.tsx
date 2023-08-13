// ErrorComponent.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for the "toBeInTheDocument" matcher
import { ErrorComponent } from "../Error";

describe("ErrorComponent", () => {
  const mockHandleRefresh = jest.fn();

  beforeEach(() => {
    render(
      <ErrorComponent
        error="Some error occurred"
        handleRefresh={mockHandleRefresh}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    expect(screen.getByText("Some error occurred")).toBeInTheDocument();
  });

  test("displays the passed error message", () => {
    expect(screen.getByText("Some error occurred")).toBeInTheDocument();
  });

  test("renders the 'Try Again' button", () => {
    const button = screen.getByText("Try Again");
    expect(button).toBeInTheDocument();
  });

  test("calls the handleRefresh function when 'Try Again' button is clicked", () => {
    const button = screen.getByText("Try Again");
    fireEvent.click(button);
    expect(mockHandleRefresh).toHaveBeenCalledTimes(1);
  });
});
