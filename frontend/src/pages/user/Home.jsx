import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import SignOutButton from "../../components/auth/SignOutButton";
import UserNav from "../../components/user/nav/UserNav";
import { useAuth } from "../../contexts/auth/AuthContext";
import logo from "../../assets/logo.png";
import Chatbot from "../../components/user/dashboard/Chatbot";
import WelcomeCard from "../../components/user/dashboard/WelcomeCard";
import Leaderboard from "../../components/user/study-timer/Leaderboard";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ViewMatches from "../../components/user/view-matches/ViewMatches";

const Home = () => {
  const { session, userInfo, userPreferences, loading } = useAuth();

  if (loading) {
    return <div>Loading Dashboard...</div>;
  }
  return (
    <div className="flex flex-col w-screen h-screen bg-orange-50 font-serif">
      <UserNav />
      <div className="grid grid-cols-2 h-full w-full">
        <Tabs isFitted variant="enclosed" className="p-8 h-full w-full">
          <TabList>
            <Tab>Chats</Tab>
            <Tab>Leaderboard</Tab>
          </TabList>
          <TabPanels className="h-full w-full">
            <TabPanel>
              <ViewMatches />
            </TabPanel>
            <TabPanel className="h-full w-full">
              <Leaderboard size="big" />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <div className="flex flex-col gap-8 p-8">
          <WelcomeCard className="" />
          <Chatbot className="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
