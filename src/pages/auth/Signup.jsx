import React, { useRef, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import SignUpCard from "../../components/auth/SignUpCard";
import CafeGraphic from "../../assets/SignupCafe.png";
import SignupGraphic from "../../assets/SignupGraphic.jpeg";
import logo from "../../assets/logo.png";

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_ANON_KEY
);

//const [isLoading, setIsLoading] = useRef(false);

const Signup = () => {
  return (
    <div className="h-screen w-full grid grid-cols-2 gap-4 justify-center">
      <div className="bg-indigo-100 h-full items-center justify-center">
        <img src={SignupGraphic} className="w-full h-full object-cover"></img>
      </div>
      <div className=" p-12 h-screen flex flex-col justify-center">
        <div className="flex justify-center pb-12">
          <img src={logo} className="w-1/3 flex"></img>
        </div>
        <SignUpCard />
      </div>
    </div>
  );
};

export default Signup;
