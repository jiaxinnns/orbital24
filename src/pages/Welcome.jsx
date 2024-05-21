import React from "react";
import { useState, useEffect } from "react";

import { createClient } from "@supabase/supabase-js";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import Home from "./user/Home";

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_ANON_KEY
);

const Welcome = () => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

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

  if (!session) {
    return (
      <div className="flex flex-col">
        welcome!
        <ChakraLink as={ReactRouterLink} to="/signup">
          Sign up
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/signin">
          Sign in
        </ChakraLink>
      </div>
    );
  } else {
    navigate("/home");
  }
};

export default Welcome;
