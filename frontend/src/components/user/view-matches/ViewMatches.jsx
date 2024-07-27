import React, { useEffect, useState } from "react";

import { useRequests } from "../../../contexts/user/RequestContext";

import { Card } from "@chakra-ui/react";
import { useAuth } from "../../../contexts/auth/AuthContext";

import { createClient } from "@supabase/supabase-js";
import MatchCard from "./MatchCard";

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_ANON_KEY
);

const ViewMatches = (props) => {
  const { session, userInfo, userPreferences, loading } = useAuth();
  const [matches, setMatches] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // fetch successful matches
        if (session) {
          const response = await fetch(
            `${
              import.meta.env.VITE_APP_API_URL || "http://localhost:4000"
            }/api/completerequeststo?to=${session.user.id}`,
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
          console.log(data);

          const cleanData =
            data &&
            data.map((d) => {
              return d.from;
            });

          setMatches((match) => match.concat(cleanData));
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchMatches();
  }, [session]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // fetch successful matches
        if (session) {
          const response = await fetch(
            `${
              import.meta.env.VITE_APP_API_URL || "http://localhost4000"
            }/api/completerequestsfrom?from=${session.user.id}`,
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
          console.log(data);

          const cleanData =
            data &&
            data.map((d) => {
              return d.to;
            });

          setMatches((match) => match.concat(cleanData));
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchMatches();
  }, [session]);

  useEffect(() => {
    console.log(matches);
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("user_info")
        .select()
        .in("id", matches);
      data && setMatchedUsers(data);
    };
    fetchUsers();
  }, [matches]);
  return (
    <div
      className={`flex flex-col gap-y-3 overflow-scroll ${
        props.size == "small" ? "w-1/2" : "w-full"
      }`}
      // style={{ maxHeight: "55rem" }}
    >
      {matchedUsers && matchedUsers.length > 0 ? (
        matchedUsers.map((pm, index) => {
          return <MatchCard pm={pm} key={index} />;
        })
      ) : (
        <Card>
          <div className="flex flex-col p-5">
            <div className="font-bold text-2xl">You have no matches yet.</div>
            <div>Find new matches with the 'Find Matches' function.</div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ViewMatches;
