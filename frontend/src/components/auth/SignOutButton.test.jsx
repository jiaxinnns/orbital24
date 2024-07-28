import React from "react";
import { render, screen } from "@testing-library/react";
import SignOutButton from "./SignOutButton";

describe("SignOutButton", () => {
  test("renders SignOutButton component", () => {
    render(<SignOutButton />);
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
  });
});
