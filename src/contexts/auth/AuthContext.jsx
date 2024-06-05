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
  const [userInfo, setUserInfo] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);
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
          return parsedSession;
        }
        setLoading(false);
      } catch (e) {
        console.log("error fetching session data");
        setLoading(false);
      }
    };

    // listen for auth state changes
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

    const fetchUserInfo = async () => {
      const session = await fetchSession();
      try {
        if (session) {
          const response = await fetch(
            `http://localhost:4000/api/getuserinfo?id=${session.user.id}`,
            {
              method: "GET",
              headers: {
                Accept: "*",
              },
            }
          );

          if (!response.ok) {
            throw new Error();
          }
          const data = await response.json();
          setUserInfo(data);
          console.log("hi");
        }
      } catch (e) {
        console.log("error fetching user info");
        setLoading(false);
      }
    };

    fetchUserInfo();
    setLoading(false);

    // Cleanup listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, userInfo, userPreferences, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
