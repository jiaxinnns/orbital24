import React from "react";
import { useRequests } from "../../contexts/user/RequestContext";
import UserNav from "../../components/user/nav/UserNav";
import { Card } from "@chakra-ui/react";
import ProfileCard from "../../components/user/find-matches/ProfileCard";
import RequestCard from "../../components/user/view-requests/RequestCard";

const Requests = () => {
  const { reqUsers } = useRequests();
  console.log(reqUsers);
  return (
    <div className="flex flex-col w-screen h-screen font-serif bg-orange-50 items-center">
      <UserNav />
      <div className="text-4xl pt-6 pr-6 pl-6 font-bold">View Requests</div>
      <div className="text-gray-700 text-xl p-6">
        View users who have requested to be your study buddy.
      </div>

      <div className="flex flex-col w-1/2 gap-y-3 overflow-scroll">
        {reqUsers ? (
          reqUsers.map((pm) => {
            return <RequestCard pm={pm} />;
          })
        ) : (
          <Card>Please refresh...</Card>
        )}
      </div>
    </div>
  );
};

export default Requests;
