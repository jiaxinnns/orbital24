import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/auth/AuthContext";
import Home from "./Home";

describe("Home", () => {
  test("renders Home component", () => {
    render(
      <AuthProvider>
        <Home />
      </AuthProvider>
    );

    // presence of the "Chats" and "Leaderboard" buttons
    expect(screen.getByRole("button", { name: /Chats/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Leaderboard/i })
    ).toBeInTheDocument();

    // presence of the WelcomeCard component
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();

    // Cpresence of the Chatbot component
    expect(screen.getByText(/AI helper/i)).toBeInTheDocument();
  });

  test("leaderboard and chat tabs are working", () => {
    render(
      <AuthProvider>
        <Home />
      </AuthProvider>
    );

    // click the 'leaderboard' button
    fireEvent.click(screen.getByText(/Leaderboard/i));

    expect(screen.getByText(/for the last/i)).toBeInTheDocument();
  });
});
