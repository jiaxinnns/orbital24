import { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

import "./App.css";
import Home from "./pages/user/Home";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Welcome from "./pages/Welcome";
import { SignIn } from "@supabase/auth-ui-react";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <div>
      <PrimeReactProvider>
        <ChakraProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route
                path="/home"
                element={<PrivateRoute component={<Home />} />}
              />
            </Routes>
          </Router>
        </ChakraProvider>
      </PrimeReactProvider>
    </div>
  );
};

export default App;
