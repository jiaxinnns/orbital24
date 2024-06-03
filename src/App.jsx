import { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

import "./App.css";
import Home from "./pages/user/Home";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Welcome from "./pages/Welcome";
import FindMatches from "./pages/user/FindMatches";
import { SignIn } from "@supabase/auth-ui-react";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./contexts/auth/AuthContext";

const App = () => {
  return (
    <div className="w-full">
      <PrimeReactProvider>
        <ChakraProvider>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route
                  path="/home"
                  element={<PrivateRoute component={<Home />} />}
                />
                <Route
                  path="/find-matches"
                  element={<PrivateRoute component={<FindMatches />} />}
                />
              </Routes>
            </Router>
          </AuthProvider>
        </ChakraProvider>
      </PrimeReactProvider>
    </div>
  );
};

export default App;
