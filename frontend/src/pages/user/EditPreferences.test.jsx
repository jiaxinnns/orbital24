import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/auth/AuthContext";
import { ToastProvider } from "../../contexts/user/ToastContext";
import EditPreferences from "./EditPreferences";

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
          <ToastProvider>
            <EditPreferences />
          </ToastProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Edit Preferences/i)).toBeInTheDocument();
  });
});
