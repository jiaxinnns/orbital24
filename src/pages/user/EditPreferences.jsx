import React from "react";
import UserNav from "../../components/user/nav/UserNav";
import EditPreferencesCard from "../../components/user/edit-preferences/EditPreferencesCard";

const EditPreferences = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center bg-orange-50">
      <UserNav />
      <div className="flex justify-self-center w-1/2 p-16">
        <EditPreferencesCard />
      </div>
    </div>
  );
};

export default EditPreferences;
