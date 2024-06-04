import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Cookies from "js-cookie";

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_ANON_KEY
);
// context for auth
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to provide authentication state
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // logic to fetch user info and session data
    const fetchSession = async () => {
      try {
        setLoading(true);
        const sessionData = Cookies.get("auth");
        if (sessionData) {
          const parsedSession = JSON.parse(sessionData);
          setSession(parsedSession);
        }
        setLoading(false);
      } catch (e) {
        console.log("error fetching session data");
        setLoading(false);
      }
    };

    fetchSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          Cookies.set("auth", JSON.stringify(session));
          setSession(session);
        } else {
          Cookies.remove("auth");
          setSession(null);
        }
      }
    );

    // Cleanup listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
