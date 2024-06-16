import React, { useRef, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { Card, CardBody, Stack, StackDivider, Toast } from "@chakra-ui/react";
import { useNavigate, Navigate, redirect, Link } from "react-router-dom";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import { Link as ChakraLink, Text } from "@chakra-ui/react";

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
  // const [id, setId] = useState();

  const submitAction = handleSubmit(async (d) => {
    // disable submit button
    setIsLoading(true);

    // sign up logic
    try {
      const { data, error } = await supabase.auth.signUp({
        email: getValues("email"),
        password: getValues("password"),
        options: {
          emailRedirectTo: "https://localhost:5173.com",
        },
      });
      data && console.log(data);
      error && console.log(error);
      if (error) {
        toast.error(error.text());
        throw new Error(error.text());
      }

      // after signup (auth) is done, get unique user id using the email
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/users?email=${encodeURIComponent(getValues("email"))}`,
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
        throw new Error();
      }

      // consolidate user data
      const user = await response.json();
      const userId = user[0].id;

      const userData = [
        {
          id: userId,
          name: getValues("name"),
          faculty: selectedFaculty,
          gender: selectedGender,
        },
      ];

      console.log(userData[0]);

      // then push to a new table with the new id and additional info
      const response1 = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/userinfo`,
        {
          method: "POST",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(userData[0]),
        }
      );

      // console.log("hello");

      if (!response1.ok) {
        // Read the error response text
        const errorDetails = await response.text();
        setIsLoading(false);
        // Throw an error with the HTTP status code and error details
        throw new Error(
          `HTTP error! Status: ${response.status}, Details: ${errorDetails}`
        );
      } else {
        toast.success("Successfully Signed Up! Please Sign In.");
      }

      console.log(response1);

      setIsLoading(false);
    } catch (e) {
      toast.error("Error Signing Up. You may have already created an account.");
      setIsLoading(false);
    }
    setIsLoading(false);
  });

  return (
    <div className="flex flex-col">
      <div>
        <Toaster />
      </div>
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
          focus:border-orange-100
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
          focus:border-orange-100
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
          type="password"
          placeholder="Password (Min. 6 characters)"
          className="input 
          border
          border-gray-300
          focus:outline-none
          focus:ring-0
          focus:border-2
          focus:border-orange-100
          rounded-md
          placeholder: pl-4
          "
          {...register("password", {
            required: "Please enter your password.",
            minLength: 6,
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
          className="bg-orange-100 
          hover:bg-orange-300
           text-black font-bold 
           py-2 px-4 
           rounded-lg
           w-full"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up Now"}
        </button>
        <ChakraLink as={Link} to="/signin">
          <Text fontSize="2xs">Already have an account? Sign in!</Text>
        </ChakraLink>
      </form>
    </div>
  );
};

export default SignUpCard;
