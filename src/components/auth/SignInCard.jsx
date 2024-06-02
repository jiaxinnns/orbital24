import React, { useState } from "react";

import { createClient } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate, redirect, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import axiosInstance from "../../axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import { Link as ChakraLink, Text } from "@chakra-ui/react";

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_ANON_KEY
);

const SignInCard = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
    control,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const submitAction = handleSubmit(async (d) => {
    // disable submit button
    setIsLoading(true);

    // login logic
    const e = getValues("email");
    const p = getValues("password");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: getValues("email"),
      password: getValues("password"),
    });

    // axios.get(`http://localhost:4000/api/signin/${hi}`).then(function (res) {
    //   console.log(res);
    // });

    // login done / failed, enable submit button
    setIsLoading(false);

    // navigate if login was successful
    if (data.session) {
      console.log(data);
      const expirationTime = new Date(new Date().getTime() + 120000);
      Cookies.set("auth", JSON.stringify(data), { expires: expirationTime });

      navigate("/home");
    } else if (error) {
      toast.error("Error Signing In");
    }
  });

  const handleFocus = () => {};
  return (
    <div className="flex flex-col">
      <div>
        <Toaster />
      </div>
      <h2 className="font-bold text-lg">Sign in</h2>
      <form
        className="w-full 
        flex 
        flex-col 
        gap-7 
        mt-8"
        onSubmit={submitAction}
      >
        <input
          type="email"
          placeholder="Email"
          className="input border 
                border-gray-300 
                text-md
                rounded-md
                focus:outline-none
                focus:ring-0
                focus:border-2
                focus:border-orange-100
                placeholder: pl-4"
          {...register("email", {
            required: "Please enter email and password",
          })}
        ></input>
        {errors.name && (
          <p className="text-red-400 text-xs italic">{errors.name.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="input 
                border 
                border-gray-300
                justify-self-center
                rounded-md
                focus:outline-none
                focus:ring-0
                focus:border-2
                focus:border-orange-100
                placeholder: pl-4
          "
          {...register("password", {
            required: "Please enter email and password",
          })}
        ></input>
        {errors.email && (
          <p className="text-red-400 text-xs italic">{errors.email.message}</p>
        )}

        <button
          className="bg-orange-100 hover:bg-yellow-800 text-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        <ChakraLink as={Link} to="/signup">
          <Text fontSize="2xs">Don't have an account? Sign up!</Text>
        </ChakraLink>
      </form>
    </div>
  );
};

export default SignInCard;
