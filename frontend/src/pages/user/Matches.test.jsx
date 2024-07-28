import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Matches from "./Matches";
import { AuthProvider } from "../../contexts/auth/AuthContext";

const mockAuthValue = {
  session: { user: { id: "123", email: "test@example.com" } },
  userInfo: {
    name: "Johnny Lim",
    gender: "Male",
    faculty: "School of Computing",
  },
  userPreferences: {
    gender: "Male",
    faculty: "School of Computing",
    study_spot: "HSSML",
  },
  loading: false,
};

describe("Find Matches", async () => {
  test("renders Find Matches component with a list of matched users", () => {
    render(
      <MemoryRouter>
        <AuthProvider value={mockAuthValue}>
          <Matches />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/View Matches/i)).toBeInTheDocument();
  });
});
