import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Welcome from "./Welcome";

describe("Welcome", () => {
  test("renders Welcome component", () => {
    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );
    // Check if the component renders correctly
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  test("Register button navigates to /signup", () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Welcome />
      </Router>
    );

    // Click the Register button
    fireEvent.click(screen.getByText(/Register/i));

    // Check if the navigation happened
    expect(history.location.pathname).toBe("/signup");
  });

  test("Sign In button navigates to /signin", () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Welcome />
      </Router>
    );

    // click the Sign In button
    fireEvent.click(screen.getByText(/Sign In/i));

    //if the navigation happened
    expect(history.location.pathname).toBe("/signin");
  });
});
