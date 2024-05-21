import React, { useRef, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { Card, CardBody, Stack, StackDivider } from "@chakra-ui/react";
import { useNavigate, Navigate, redirect } from "react-router-dom";
import Select from "react-select";

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_ANON_KEY
);

const SignUpCard = () => {
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

  const faculties = [
    { label: "School of Computing" },
    { label: "College of Humanities & Sciences" },
    { label: "Medicine" },
    { label: "Law" },
    { label: "Dentistry" },
    { label: "College of Design & Engineering" },
    { label: "Others" },
  ];

  const genders = [{ label: "Male" }, { label: "Female" }, { label: "Others" }];

  const [selectedFaculty, setSelectedFaculty] = useState("Others");
  const [selectedGender, setSelectedGender] = useState("Others");
  const [id, setId] = useState();

  const submitAction = handleSubmit(async (d) => {
    // disable submit button
    setIsLoading(true);

    // sign up logic
    const { data, error } = await supabase.auth.signUp({
      email: getValues("email"),
      password: getValues("password"),
      options: {
        emailRedirectTo: "https://localhost:5173.com",
      },
    });
    data && console.log(data);
    error && console.log(error);

    // after signup (auth) is done, get unique user id using the email
    try {
      const response = await fetch(
        `http://localhost:4000/api/users?email=${encodeURIComponent(
          getValues("email")
        )}`,
        {
          method: "GET",
          headers: {
            Accept: "*",
          },
        }
      );

      if (!response.ok) {
        const e = await response.text();
        console.log(e);
        throw new Error(response);
      } else {
        const user = await response.json();
        console.log(user[0].id);
        setId(user[0].id);
      }
    } catch (error) {
      console.log(error);
    }

    // consolidate user data

    const userData = [
      {
        id: id,
        name: getValues("name"),
        faculty: selectedFaculty,
        gender: selectedGender,
      },
    ];

    console.log(userData[0]);

    // then push to a new table with the new id and additional info
    const response1 = await fetch("http://localhost:4000/api/userinfo", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(userData[0]),
    });

    if (!response1.ok) {
      // Read the error response text
      const errorDetails = await response.text();
      // Throw an error with the HTTP status code and error details
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorDetails}`
      );
    }

    console.log(response1);

    setIsLoading(false);
  });

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-lg font-serif">Sign Up</h2>
      <form
        className="w-full 
        flex 
        flex-col 
        gap-6 
        mt-8"
        onSubmit={submitAction}
      >
        <input
          type="text"
          placeholder="Name or Nickname"
          className="input border 
          border-gray-300
          rounded-md
          focus:outline-none
          focus:ring-0
          focus:border-2
          focus:border-indigo-200
          placeholder: pl-4"
          {...register("name", {
            required: "Please enter your name.",
          })}
        ></input>
        {errors.name && (
          <p className="text-red-400 text-xs italic">{errors.name.message}</p>
        )}

        <input
          type="email"
          placeholder="NUS Email"
          className="input 
          border 
          border-gray-300 
          focus:outline-none
          focus:ring-0
          focus:border-2
          focus:border-indigo-200
          rounded-md
          placeholder: pl-4"
          {...register("email", {
            required: "Please enter a valid NUS email.",
          })}
        ></input>
        {errors.email && (
          <p className="text-red-400 text-xs italic">{errors.email.message}</p>
        )}

        <input
          type="text"
          placeholder="Password"
          className="input 
          border
          border-gray-300
          focus:outline-none
          focus:ring-0
          focus:border-2
          focus:border-indigo-200
          rounded-md
          placeholder: pl-4
          "
          {...register("password", {
            required: "Please enter your password.",
          })}
        ></input>
        {errors.email && (
          <p className="text-red-400 text-xs italic">
            {errors.password.message}
          </p>
        )}

        <div className="flex gap-x-2">
          <Select
            options={faculties}
            placeholder={<div>Faculty</div>}
            className="w-1/2 rounded-md"
            required
            onChange={(choice) => {
              console.log(choice);
              setSelectedFaculty(choice.label);
            }}
          ></Select>

          <Select
            options={genders}
            placeholder={<div>Gender</div>}
            className="w-1/2 rounded-md"
            required
            onChange={(choice) => {
              console.log(choice);
              setSelectedGender(choice.label);
            }}
          ></Select>
        </div>

        <button
          className="bg-indigo-200 
          hover:bg-indigo-300
           text-white font-bold 
           py-2 px-4 
           rounded-lg
           w-full"
          type="submit"
          disabled={isLoading}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpCard;
