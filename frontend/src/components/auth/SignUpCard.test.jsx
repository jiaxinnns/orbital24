import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUpCard from "./SignUpCard";

describe("SignUpCard", () => {
  test("renders SignUpCard component", () => {
    render(
      <MemoryRouter>
        <SignUpCard />
      </MemoryRouter>
    );
    // heading
    expect(
      screen.getByRole("heading", { name: /sign up/i })
    ).toBeInTheDocument();
    // button
    expect(
      screen.getByRole("button", { name: /sign up now/i })
    ).toBeInTheDocument();
  });
});
