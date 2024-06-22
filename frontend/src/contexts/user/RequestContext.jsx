import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "../auth/AuthContext";

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_ANON_KEY
);
// context for matches
const RequestContext = createContext();

export const useRequests = () => {
  return useContext(RequestContext);
};

export const RequestProvider = ({ children }) => {
  // get user preferences and info
  const { session, userInfo, userPreferences, loading } = useAuth();

  const [requests, setRequests] = useState([]);

  const [reqUsers, setReqUsers] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (session) {
          const response = await fetch(
            `${import.meta.env.VITE_APP_API_URL}/api/incompleterequeststo?to=${
              session.user.id
            }`,
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

          const cleanData = data.map((d) => {
            return d.from;
          });

          setRequests(cleanData);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchRequests();
  }, [session]);

  useEffect(() => {
    // console.log(requests);
    const fetchUsers = async () => {
      if (requests.length > 0) {
        const { data, error } = await supabase
          .from("user_info")
          .select()
          .in("id", requests);

        // console.log(data);
        setReqUsers(data);
      }
    };

    fetchUsers();
  }, [requests]);

  return (
    <RequestContext.Provider value={{ reqUsers }}>
      {children}
    </RequestContext.Provider>
  );
};
