import React, { useState } from "react";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { useToastContext } from "../../../contexts/user/ToastContext";

const DeclineRequestButton = (props) => {
  const { session, userInfo, userPreferences, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastContext();
  const handleDecline = async () => {
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
        `${import.meta.env.VITE_APP_API_URL}/api/declinerequest`,
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
      }

      showToast("Request denied.");
    } catch (e) {
      console.log(e);
      showToast("Error decling request.");
    }
  };
  return (
    <div>
      <div>
        <button
          onClick={handleDecline}
          className="bg-white text-black border border-black rounded-full"
        >
          <p className="p-1 text-sm">Decline</p>
        </button>
      </div>
    </div>
  );
};

export default DeclineRequestButton;
