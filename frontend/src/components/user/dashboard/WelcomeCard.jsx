import { Card } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../../contexts/auth/AuthContext";

const WelcomeCard = () => {
  const { session, userInfo } = useAuth();

  return (
    <div className="">
      <Card className="p-4">
        <p>Welcome back,</p>
        <p className="text-3xl font-bold">{userInfo?.name}</p>
      </Card>
    </div>
  );
};

export default WelcomeCard;
