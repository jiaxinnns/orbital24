import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import SignOutButton from "../../components/auth/SignOutButton";
import UserNav from "../../components/user/nav/UserNav";
import { useAuth } from "../../contexts/auth/AuthContext";
import logo from "../../assets/logo.png";

const Home = () => {
  const { session, userInfo, userPreferences, loading } = useAuth();
  console.log(session);
  if (loading) {
    return <div>Loading Dashboard...</div>;
  }
  return (
    <div className="flex flex-col w-screen h-screen bg-orange-50 font-serif">
      <UserNav />
      <div className="flex gap-4 p-5 h-full">
        <div className="basis-1/3 bg-gray-50 rounded-3xl w-full h-full p-10 border-l-4 border-orange-950">
          Chats
        </div>
        <div className="basis-2/3 flex bg-gray-50 rounded-3xl w-full p-10 gap-y-5 items-start">
          <div className="flex flex-col basis-3/4 w-full items-start gap-y-4">
            <p className="font-bold text-5xl">
              Welcome {userInfo && userInfo.name}!
            </p>
            <p className="font-bold text-xl text-gray-700">
              {session && session.user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
