import React, { useEffect, useState } from "react";

import { useRequests } from "../../contexts/user/RequestContext";
import UserNav from "../../components/user/nav/UserNav";
import { Card } from "@chakra-ui/react";
import ProfileCard from "../../components/user/find-matches/ProfileCard";
import RequestCard from "../../components/user/view-requests/RequestCard";
import { useAuth } from "../../contexts/auth/AuthContext";
import { createClient } from "@supabase/supabase-js";
import MatchCard from "../../components/user/view-matches/MatchCard";

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_ANON_KEY
);

const Matches = () => {
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
              import.meta.env.VITE_APP_API_URL || "http://localhost4000"
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
    <div className="flex flex-col w-screen h-screen font-serif bg-orange-50 items-center">
      <UserNav />
      <div className="text-4xl pt-6 pr-6 pl-6 font-bold">View Matches</div>
      <div className="text-gray-700 text-xl p-6">
        Users you have successfully matched with.
      </div>

      <div className="flex flex-col w-1/2 gap-y-3 overflow-scroll">
        {matchedUsers ? (
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
    </div>
  );
};

export default Matches;
