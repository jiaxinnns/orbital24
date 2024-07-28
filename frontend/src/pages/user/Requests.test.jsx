import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/auth/AuthContext";
import { RequestProvider } from "../../contexts/user/RequestContext";
import Requests from "./Requests";

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

describe("Requests", async () => {
  test("renders Requests component with a list of users who have sent a request", () => {
    render(
      <MemoryRouter>
        <AuthProvider value={mockAuthValue}>
          <RequestProvider>
            <Requests />
          </RequestProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/View Requests/i)).toBeInTheDocument();
  });
});
