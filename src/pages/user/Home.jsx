import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import SignOutButton from "../../components/auth/SignOutButton";
import UserNav from "../../components/user/nav/UserNav";
import { useAuth } from "../../contexts/auth/AuthContext";

const Home = () => {
  const { session, loading } = useAuth();
  return (
    <div className="flex flex-col w-screen h-screen bg-orange-100">
      <UserNav />
      <div>Homepage</div>
      <div>Welcome {session ? session.user.email : "!"}</div>
      <div>
        UI for the homepage is still incomplete. Sign out button is in the
        sidebar on the left!
      </div>
    </div>
  );
};

export default Home;
