import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/auth/AuthContext";
import { MatchProvider } from "../../contexts/user/MatchContext";
import FindMatches from "./FindMatches";

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
  test("renders find matches component with a list of recommended users", () => {
    render(
      <MemoryRouter>
        <AuthProvider value={mockAuthValue}>
          <MatchProvider>
            <FindMatches />
          </MatchProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Find Matches/i)).toBeInTheDocument();
  });
});
