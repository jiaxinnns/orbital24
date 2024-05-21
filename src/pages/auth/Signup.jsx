import React, { useRef, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import SignUpCard from "../../components/auth/SignUpCard";
import CafeGraphic from "../../assets/SignupCafe.png";

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_ANON_KEY
);

//const [isLoading, setIsLoading] = useRef(false);

const Signup = () => {
  return (
    <div className="h-screen w-screen flex justify-center">
      <div className="bg-indigo-100 w-3/5 h-full rounded-r-3xl flex flex-col items-center justify-center">
        <img src={CafeGraphic} className="h-[60vh] w-[60vh]"></img>
      </div>
      <div className="w-2/5 pt-8 pb-8 pl-8 pr-8 h-screen flex flex-col justify-center">
        <SignUpCard />
      </div>
    </div>
  );
};

export default Signup;
