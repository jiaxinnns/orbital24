import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import SignOutButton from "../../components/auth/SignOutButton";

const Home = () => {
  const supabase = createClient(
    import.meta.env.VITE_APP_SUPABASE_URL,
    import.meta.env.VITE_APP_ANON_KEY
  );

  const [email, setEmail] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getSession();
      setEmail(data.session.user.email);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col w-screen h-screen bg-orange-100">
      <div>Homepage</div>
      <div>Welcome {email}</div>
      <SignOutButton />
    </div>
  );
};

export default Home;
