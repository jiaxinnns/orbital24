import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from "./Profile";
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

describe("Profile", async () => {
  test("renders Profile component with user info and preferences", async () => {
    render(
      <MemoryRouter>
        <AuthProvider value={mockAuthValue}>
          <Profile />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      // Check for user information
      expect(screen.getByText(/Your Information/i)).toBeInTheDocument();
    });
  });
});
