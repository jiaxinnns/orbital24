import React from "react";
import { useState, useEffect, Suspense } from "react";

import { createClient } from "@supabase/supabase-js";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Card, CardHeader, Link as ChakraLink } from "@chakra-ui/react";
import landingPage from "../assets/landingPage.png";
import logo from "../assets/logo.png";

import Home from "./user/Home";

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_ANON_KEY
);

const Welcome = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="w-screen h-full grid grid-cols-2 bg-orange-100">
      <img src={landingPage} className="h-full object-cover"></img>
      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="flex justify-center">
          <img src={logo} className="w-1/3 flex"></img>
        </div>
        <div className="p-12 flex flex-col gap-2 justify-center">
          <div className="font-serif text-3xl">Find a Study Buddy</div>
          <p className="text-md text-gray-800">Feeling unmotivated?</p>
          <p className="text-sm text-gray-800">
            Find a study buddy from your faculty and with the same study
            preferences as you!
          </p>
        </div>
        <div className="flex gap-4 w-full pl-16 pr-16">
          <button
            onClick={handleSignup}
            className="bg-orange-200 hover:bg-yellow-800 hover:text-white basis-3/5 rounded-2xl"
          >
            <p className="p-2">Register</p>
          </button>
          <button
            onClick={handleSignIn}
            className="bg-white hover:bg-yellow-800 hover:text-white basis-2/5 rounded-2xl"
          >
            <p className="p-2">Sign In</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
