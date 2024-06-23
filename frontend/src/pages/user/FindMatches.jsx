import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/auth/AuthContext";
import UserNav from "../../components/user/nav/UserNav";

import { useMatches } from "../../contexts/user/MatchContext";
import { Card, CardBody } from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import ProfileCard from "../../components/user/find-matches/ProfileCard";

const FindMatches = () => {
  const { possMatches } = useMatches();
  console.log(possMatches);

  return (
    <div className="flex flex-col w-screen h-screen font-serif bg-orange-50 items-center">
      <UserNav />
      <div className="text-4xl pt-6 pr-6 pl-6 font-bold">Find Matches</div>
      <div className="text-gray-700 text-xl p-6">
        Browse users who are similar to your ideal study buddy.
      </div>
      <div className="flex flex-col w-1/2 gap-y-3 overflow-scroll">
        {possMatches ? (
          possMatches.map((pm, index) => {
            return <ProfileCard pm={pm} key={index} />;
          })
        ) : (
          <Card>Please refresh...</Card>
        )}
      </div>
      <div className="p-4 text-gray-600">
        &copy; StudyBuddies 2024 <br /> All rights reserved.
      </div>
    </div>
  );
};

export default FindMatches;
