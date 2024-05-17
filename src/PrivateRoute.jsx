import React, { useState, useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import Home from "./pages/user/Home";
import { createClient } from "@supabase/supabase-js";
import Cookies from "js-cookie";

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_ANON_KEY
);

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  console.log(session);
  return !!Cookies.get("auth") ? Component : <Navigate to="/signin" />;
};

export default PrivateRoute;
