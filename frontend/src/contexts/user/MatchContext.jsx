import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "../auth/AuthContext";

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_ANON_KEY
);
// context for matches
const MatchContext = createContext();

export const useMatches = () => {
  return useContext(MatchContext);
};

// MatchProvider component to provide authentication state
export const MatchProvider = ({ children }) => {
  // get user preferences and info
  const { session, userInfo, userPreferences, loading } = useAuth();

  // initialise users but with an additional field for compatibility score
  const [scores, setScores] = useState([]);

  // store fetched users
  const [users, setUsers] = useState(null);

  // initialise matches to display
  const [possMatches, setPossMatches] = useState([]);

  // keep track of singular compatibility score
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/api/allusers`,
          {
            method: "GET",
            headers: {
              Accept: "*",
            },
          }
        );

        if (!response.ok) {
          throw new Error();
        } else {
          const data = await response.json();
          // console.log(data);
          setUsers(data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchUsers();
    console.log(users);
  }, []);

  useEffect(() => {
    // calculate a compatibility score for each user
    // preferred study spot -> + 1
    // preferred gender -> + 2
    // preferred faculty -> + 2

    const tempScores =
      users &&
      userPreferences &&
      users.map((user) => {
        let count = 0;
        if (user.gender === userPreferences.gender) {
          count += 2;
        }

        if (user.faculty === userPreferences.faculty) {
          count += 2;
        }

        return { ...user, score: count };
      });

    setScores(tempScores);

    // console.log(scores);

    const tempPossMatches =
      scores &&
      scores
        .sort((a, b) => {
          return b.score - a.score;
        })
        .slice(0, 9);

    // console.log(tempPossMatches);
    setPossMatches(tempPossMatches);
  }, [users, setUsers, userPreferences]);

  return (
    <MatchContext.Provider value={{ possMatches }}>
      {children}
    </MatchContext.Provider>
  );
};
