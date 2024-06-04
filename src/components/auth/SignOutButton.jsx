import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Cookies from "js-cookie";

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_ANON_KEY
);

const SignOutButton = (props) => {
  const [loading, setLoading] = useState(false);
  async function handleClick(e) {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      error && console.log(error);
      !error && Cookies.remove("auth");
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }
  return (
    <button
      className="w-2/5 
      rounded-full  
      bg-orange-950 
      text-white
      hover:border-white
      "
      disabled={loading}
      onClick={handleClick}
    >
      <p className="font-serif p-1 text-sm">
        {loading ? "Signing Out..." : "Sign Out"}
      </p>
    </button>
  );
};

export default SignOutButton;
