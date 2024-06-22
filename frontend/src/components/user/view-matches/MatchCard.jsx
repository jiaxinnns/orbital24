import React, { useState } from "react";
import { Card } from "@chakra-ui/react";
import logo from "../../../assets/logo.png";
import ChatButton from "./ChatButton";
import { useAuth } from "../../../contexts/auth/AuthContext";

const MatchCard = (props) => {
  const { session, userInfo, userPreferences, loading } = useAuth();

  // concat the 2 user IDs to form a unique chat ID

  const chatId = session && [props.pm.id, session.user.id].sort().join("-");

  return (
    <div>
      <Card
        className="w-full"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
      >
        <img src={logo} className="w-36 p-4"></img>
        <div className="flex overflow-hidden">
          <div className="p-8 flex flex-col">
            <div className="text-2xl flex justify-start font-bold">
              {props.pm.name}
            </div>
            <div className="text-lg flex justify-start text-gray-500">
              {props.pm.gender} | {props.pm.faculty}
            </div>
            <div className="flex gap-x-2 justify-start pt-2">
              {chatId && <ChatButton chatId={chatId} user={props.pm} />}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MatchCard;
