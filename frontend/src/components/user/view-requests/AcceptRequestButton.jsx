import React, { useState } from "react";
import { useMatches } from "../../../contexts/user/MatchContext";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { useToastContext } from "../../../contexts/user/ToastContext";

const AcceptRequestButton = (props) => {
  const { session, userInfo, userPreferences, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const { showToast } = useToastContext();

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      // find request ID
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

      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();

      console.log(data[0].id);

      // complete the request based on ID
      const response1 = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/completerequest`,
        {
          method: "POST",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify({ id: data[0].id }),
        }
      );

      if (!response1.ok) {
        throw new Error();
      } else {
        showToast("Request accepted.");
        setIsAccepted(true);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      showToast("Error accepting request.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <button
        className="bg-orange-950 text-white rounded-full"
        onClick={handleAccept}
        disabled={isLoading || isAccepted}
      >
        <p className="p-1 text-sm">
          {isLoading
            ? "Accepting..."
            : isAccepted
            ? "Accepted"
            : "Accept Request"}
        </p>
      </button>
    </div>
  );
};

export default AcceptRequestButton;
