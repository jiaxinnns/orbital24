import React from "react";
import { render, screen } from "@testing-library/react";
import SignInCard from "./SignInCard";
import { BrowserRouter as Router } from "react-router-dom";

describe("SignInCard", () => {
  test("renders SignInCard component", () => {
    render(
      <Router>
        <SignInCard />
      </Router>
    );
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign In/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Don't have an account? Sign up!")
    ).toBeInTheDocument();
  });
});
