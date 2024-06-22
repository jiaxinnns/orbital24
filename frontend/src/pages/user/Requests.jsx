import React, { useEffect, useState } from "react";
import { useRequests } from "../../contexts/user/RequestContext";
import UserNav from "../../components/user/nav/UserNav";
import { Card } from "@chakra-ui/react";
import ProfileCard from "../../components/user/find-matches/ProfileCard";
import RequestCard from "../../components/user/view-requests/RequestCard";

const Requests = () => {
  const [loading, setLoading] = useState(false);

  const { reqUsers } = useRequests();

  // console.log(reqUsers);
  return (
    <div className="flex flex-col w-screen h-screen font-serif bg-orange-50 items-center">
      <UserNav />
      <div className="text-4xl pt-6 pr-6 pl-6 font-bold">View Requests</div>
      <div className="text-gray-700 text-xl p-6">
        View users who have requested to be your study buddy.
      </div>

      <div className="flex flex-col w-1/2 gap-y-3 overflow-scroll">
        {reqUsers && reqUsers.length > 0 ? (
          reqUsers.map((pm) => {
            return <RequestCard pm={pm} />;
          })
        ) : (
          <Card>
            <div className="flex flex-col p-5">
              <div className="font-bold text-2xl">
                You have no requests yet.
              </div>
              <div>Find new matches with the 'Find Matches' function.</div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Requests;
