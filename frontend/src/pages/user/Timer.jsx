import React from "react";
import UserNav from "../../components/user/nav/UserNav";
import Stopwatch from "../../components/user/study-timer/Stopwatch";
import Leaderboard from "../../components/user/study-timer/Leaderboard";

const Timer = () => {
  return (
    <div className="flex flex-col w-screen h-screen font-serif bg-orange-50 items-center">
      <UserNav />

      <div className="grid grid-cols-2 h-full w-full">
        <Stopwatch />
        <Leaderboard />
      </div>
    </div>
  );
};

export default Timer;
