import React from "react";
import { createClient } from "@supabase/supabase-js";
import Cookies from "js-cookie";

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_ANON_KEY
);

const SignOutButton = () => {
  async function handleClick(e) {
    const { error } = await supabase.auth.signOut();
    error && console.log(error);
    !error && Cookies.remove("auth");
  }
  return (
    <button className="border-gray-500" onClick={handleClick}>
      sign out
    </button>
  );
};

export default SignOutButton;
