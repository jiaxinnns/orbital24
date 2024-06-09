import React, { useId } from "react";
import UserNav from "../../components/user/nav/UserNav";
import { Card, CardBody, Divider } from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import { useAuth } from "../../contexts/auth/AuthContext";

const Profile = () => {
  // get session info
  const { session, userInfo, userPreferences, loading } = useAuth();
  const userID = session && session.user.id;
  console.log(userPreferences);

  // get user info

  // get user preferences
  return (
    <div className="flex flex-col w-screen h-screen bg-orange-100 items-center">
      <UserNav />
      <div className="flex w-1/2 p-16 font-serif">
        <Card className="flex flex-col items-center gap-y-5 w-full p-4">
          <div className="flex justify-center pt-5 gap-x-4">
            <img src={logo} className="w-1/5"></img>
            <div className="flex flex-col justify-center">
              <div className="text-2xl font-bold font-serif">
                {userInfo ? userInfo.name : "Please refresh..."}
              </div>
              <div className="text-lg text-gray-600 font-serif">
                {session ? session.user.email : "Loading..."}
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col text-gray-500">
            <div className="text-lg text-gray-600">Your Information</div>
            <div className="">Gender: {userInfo && userInfo.gender}</div>
            <div className="">Faculty: {userInfo && userInfo.faculty}</div>
          </div>
          <Divider />
          <div className="flex flex-col text-gray-500">
            <div className="text-lg text-gray-600">Your Preferences</div>
            <div className="">
              Gender: {userPreferences && userPreferences.gender}
            </div>
            <div className="">
              Faculty: {userPreferences && userPreferences.faculty}
            </div>
            <div className="">
              Study Spot: {userPreferences && userPreferences.study_spot}
            </div>
          </div>
          <div className="font-serif text-4xl"></div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
