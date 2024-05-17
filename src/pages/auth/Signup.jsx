import React, { useRef, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_ANON_KEY
);

//const [isLoading, setIsLoading] = useRef(false);

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
    control,
  } = useForm();

  const submitAction = handleSubmit(async (d) => {
    const { data, error } = await supabase.auth.signUp({
      email: getValues("email"),
      password: getValues("password"),
      options: {
        emailRedirectTo: "https://localhost:5173.com/welcome",
      },
    });

    error && console.log(error);
  });

  return (
    <form className="w-full flex flex-col gap-7 mt-14" onSubmit={submitAction}>
      <label className="text-black-500 font-semibold">
        Name
        <input
          type="text"
          className="input"
          {...register("name", {
            required: "This field is required",
          })}
        ></input>
      </label>
      {errors.name && (
        <p className="text-red-500 text-xs italic">{errors.name.message}</p>
      )}

      <label className="text-black-500 font-semibold">
        NUS Email
        <input
          type="email"
          className="input"
          {...register("email", {
            required: "This field is required",
          })}
        ></input>
      </label>
      {errors.email && (
        <p className="text-red-500 text-xs italic">{errors.email.message}</p>
      )}

      <label className="text-black-500 font-semibold">
        Password
        <input
          type="text"
          className="input"
          {...register("password", {
            required: "This field is required",
            minLength: 8,
          })}
        ></input>
      </label>
      {errors.password && (
        <p className="text-red-500 text-xs italic">{errors.email.message}</p>
      )}

      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        type="submit"
      >
        sign up
      </button>
    </form>
  );
};

export default Signup;
