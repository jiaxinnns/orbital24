import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { Card } from "@chakra-ui/react";
import logo from "../../../assets/logo.png";

const Leaderboard = () => {
  const { session, userInfo, userPreferences, loading } = useAuth();

  const [matches, setMatches] = useState([]);
  const [matchesFrom, setMatchesFrom] = useState([]);
  const [matchesTo, setMatchesTo] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchMatchesTo = async () => {
      if (session) {
        try {
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
            throw new Error("Failed to fetch matches");
          }

          const data = await response.json();
          const cleanData = data.map((d) => d.from);

          setMatchesTo(cleanData);
        } catch (e) {
          console.error(e);
        }
      }
    };

    const fetchMatchesFrom = async () => {
      if (session) {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_APP_API_URL || "http://localhost:4000"
            }/api/completerequestsfrom?from=${session.user.id}`,
            {
              method: "GET",
              headers: {
                Accept: "*",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch matches");
          }

          const data = await response.json();
          const cleanData = data.map((d) => d.to);

          setMatchesFrom(cleanData);
        } catch (e) {
          console.error(e);
        }
      }
    };

    fetchMatchesTo();
    fetchMatchesFrom();
  }, [session]);

  useEffect(() => {
    const combineMatches = () => {
      setMatches([...matchesFrom, ...matchesTo, session?.user.id]);
    };

    combineMatches();
  }, [matchesFrom, matchesTo]);

  useEffect(() => {
    //console.log(matches);
    const leaderboardData = [];

    const fetchLeaderboard = async () => {
      if (matches && matches.length > 0) {
        const fetchLogs = async (m) => {
          if (!m) return;
          const response = await fetch(
            `${
              import.meta.env.VITE_APP_API_URL || "http://localhost:4000"
            }/api/getlogs?user_id=${m}`,
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

          const totalDuration =
            data &&
            data.reduce((x, y) => {
              return x + y.duration;
            }, 0);

          const newEntry = data[0] && {
            name: data[0].user_name,
            duration: totalDuration,
          };

          if (
            newEntry &&
            !leaderboardData.map((l) => l && l.name).includes(newEntry.name)
          ) {
            newEntry && leaderboardData.push(newEntry);
          }
        };

        await Promise.all(matches.map(fetchLogs));
        setLeaderboard(
          leaderboardData
            .sort((l1, l2) => l2.duration - l1.duration)
            .slice(0, 5)
        );
      }
    };
    fetchLeaderboard();

    console.log(leaderboard);
  }, [matches]);

  return (
    <div className="w-full h-full p-12 flex flex-col gap-y-4 justify-center">
      <div className="text-3xl font-bold">
        Leaderboard
        <div className="text-lg text-gray-500">for the last 7 days.</div>
      </div>

      {leaderboard && leaderboard.length > 0 ? (
        leaderboard.map((l, index) => (
          <Card
            direction={{ base: "column", sm: "row" }}
            className="w-full flex overflow-hidden"
            key={index}
          >
            <img src={logo} className="w-36 p-4" alt={`${l.name} logo`} />
            <div className="flex flex-col sm:flex-row overflow-hidden ">
              <div className="p-8 flex flex-col gap-y-2 items-start">
                <div className="text-2xl font-bold">
                  {l.name} {l.name == userInfo?.name && "(you)"}
                </div>
                <div className="text-xl text-gray-500">
                  {l.duration} minute(s)
                </div>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <Card>Your friends haven't been active.</Card>
      )}
    </div>
  );
};

export default Leaderboard;
