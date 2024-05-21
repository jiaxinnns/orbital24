import React, { useState } from "react";
import { Card, CardBody, Stack, StackDivider } from "@chakra-ui/react";

import { createClient } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate, redirect } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import axiosInstance from "../../axiosConfig";

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

    const expirationTime = new Date(new Date().getTime() + 120000);
    Cookies.set("auth", JSON.stringify(response), { expires: expirationTime });

    // login done / failed, enable submit button
    setIsLoading(false);

    // navigate if login was successful
    if (data) {
      navigate("/home");
    }
  });

  const handleFocus = () => {};
  return (
    <div>
      <Card className="h-screen">
        <CardBody>
          <Stack divider={<StackDivider />}>
            <h2 className="font-bold text-lg">Sign in</h2>
            <form
              className="w-full 
        flex 
        flex-col 
        gap-7 
        mt-8"
              onSubmit={submitAction}
            >
              <label className="text-black-500 font-semibold">NUS Email</label>
              <input
                type="email"
                className="input border border-gray-300 text-md"
                {...register("email", {
                  required: "Please enter email and password",
                })}
              ></input>
              {errors.name && (
                <p className="text-red-400 text-xs italic">
                  {errors.name.message}
                </p>
              )}

              <label className="text-black-500 font-semibold">Password</label>
              <input
                type="text"
                className="input 
          border 
          border-gray-300
          justify-self-center
          "
                {...register("password", {
                  required: "Please enter email and password",
                })}
              ></input>
              {errors.email && (
                <p className="text-red-400 text-xs italic">
                  {errors.email.message}
                </p>
              )}

              <button
                className="bg-blue-200 hover:bg-indigo-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
                disabled={isLoading}
              >
                sign in
              </button>
            </form>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignInCard;
