import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import SignOutButton from "../../components/auth/SignOutButton";
import UserNav from "../../components/user/nav/UserNav";
import { useAuth } from "../../contexts/auth/AuthContext";
import logo from "../../assets/logo.png";
import Chatbot from "../../components/user/dashboard/Chatbot";
import WelcomeCard from "../../components/user/dashboard/WelcomeCard";
import Leaderboard from "../../components/user/study-timer/Leaderboard";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import ViewMatches from "../../components/user/view-matches/ViewMatches";

const Home = () => {
  const { session, userInfo, userPreferences, loading } = useAuth();

  const [isChat, setIsChat] = useState(true);

  if (loading) {
    return <div>Loading Dashboard...</div>;
  }
  return (
    <div className="flex flex-col w-screen h-screen bg-orange-50 font-serif">
      <UserNav />
      <div className="grid grid-cols-2 h-full w-full">
        {/* <Tabs
          isFitted
          variant="enclosed"
          className="p-8 h-full w-full"
          style={{ maxHeight: "55rem" }}
        >
          <TabList>
            <Tab>Chats</Tab>
            <Tab>Leaderboard</Tab>
          </TabList>
          <TabPanels className="h-full w-full">
            <TabPanel>
              <ViewMatches className="overflow-scroll" />
            </TabPanel>
            <TabPanel className="h-full w-full">
              <Leaderboard size="big" />
            </TabPanel>
          </TabPanels>
        </Tabs> */}

        <div className="h-screen">
          <div className="flex justify-center gap-x-3 p-8">
            <button
              className={`basis-1/2 rounded-t-3xl h-10 ${
                isChat ? "bg-orange-950 text-white" : ""
              }`}
              onClick={() => {
                setIsChat(true);
              }}
            >
              Chats
            </button>
            <button
              className={`basis-1/2 rounded-t-3xl h-10 ${
                !isChat ? "bg-orange-950 text-white" : ""
              }`}
              onClick={() => {
                setIsChat(false);
              }}
            >
              Leaderboard
            </button>
          </div>
          <div className="h-full pl-8 pr-8">
            {isChat ? (
              <div className="flex flex-col pb-12 h-[85%] font-serif">
                <ViewMatches size="big" />
              </div>
            ) : (
              <div className="flex flex-col pb-12 h-[90%] font-serif">
                <Leaderboard size="big" />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8 p-8">
          <WelcomeCard className="" />
          <div className="h-[90%] pb-12">
            <Chatbot />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
