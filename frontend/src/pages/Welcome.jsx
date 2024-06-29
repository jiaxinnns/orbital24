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
      <div className="text-7xl italic pt-24">Feeling Unmotivated?</div>
      <div className="text-3xl italic pt-6">
        Find a study buddy to keep you in check and discuss schoolwork, in just
        4 steps.
      </div>

      <div className="flex items-end h-full w-full p-24 px-56 gap-x-24">
        <div className="h-full w-full pt-52 basis-1/4">
          <div className="bg-orange-100 flex flex-col gap-y-3 h-full p-6">
            <div className="font-bold text-2xl">1. Edit Preferences</div>
            <div className="text-gray-800">
              Specify the traits of your ideal study buddy, like their faculty
              and gender.
            </div>
            <div className="text-gray-800">
              You may edit these preferences anytime.
            </div>
          </div>
        </div>
        <div className="h-full w-full pt-16 basis-1/4">
          <div className="bg-neutral-300 flex flex-col h-full gap-y-3 p-6">
            <div className="font-bold text-2xl">2. Browse Users</div>
            <div className="text-gray-800">
              You will be recommended some users that are the most similar to
              your ideal study buddy, in terms of their gender and field of
              study.
            </div>
            <div className="text-gray-800">
              You may send them a request if you'd like them to be your study
              buddy.
            </div>
            <div className="text-gray-800">
              Your profile may also be recommended to other users.
            </div>
          </div>
        </div>
        <div className="h-full w-full basis-1/4 pt-64">
          <div className="bg-zinc-200 flex flex-col h-full basis-1/4 gap-y-3 p-6">
            <div className="font-bold text-2xl">3. Match</div>
            <div className="text-gray-800">
              Check if any users have accepted your request, or have sent you a
              request.
            </div>
            <div className="text-gray-800">
              You can decline a request, or accept it to match with the user.
            </div>
          </div>
        </div>
        <div className="w-full h-full pt-36 basis-1/4">
          <div className="bg-orange-100 flex flex-col h-full basis-1/4 gap-y-3 p-6">
            <div className="font-bold text-2xl">4. Chat</div>
            <div className="text-gray-800">
              You may chat in real time with any user you have matched with.
            </div>
            <div className="text-gray-800">
              You can arrange study dates or ask for help with schoolwork, while
              staying semi-anonymous.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
