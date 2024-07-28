import React from "react";

import { createClient } from "@supabase/supabase-js";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import landingPage from "../assets/landingPage.jpg";

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
    <div className="h-screen flex flex-col w-screen font-serif bg-orange-50">
      <div className="flex w-full justify-end bg-orange-950 items-center text-2xl p-3 text-white">
        <div className="">
          <button
            onClick={handleSignup}
            className="bg-transparent border-none rounded-2xl"
          >
            <p className="px-2">Register</p>
          </button>
          |
          <button
            onClick={handleSignIn}
            className="bg-transparent border-none rounded-2xl"
          >
            <p className="px-2">Sign In</p>
          </button>
        </div>
      </div>
      <img src={landingPage} className="h-full w-full object-cover"></img>
    </div>
  );
};

export default Welcome;
