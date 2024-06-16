import React, { useState } from "react";
import { useMatches } from "../../../contexts/user/MatchContext";
import { useAuth } from "../../../contexts/auth/AuthContext";

const AcceptRequestButton = (props) => {
  const { session, userInfo, userPreferences, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    // find request ID
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/requests?from=${
          props.pm.id
        }&to=${session.user.id}`,
        {
          method: "GET",
          headers: {
            Accept: "*",
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <button
        className="bg-orange-950 text-white rounded-full"
        onClick={handleClick}
      >
        <p className="p-1 text-sm">
          {isLoading ? "Accepting..." : "Accept Request"}
        </p>
      </button>
    </div>
  );
};

export default AcceptRequestButton;
