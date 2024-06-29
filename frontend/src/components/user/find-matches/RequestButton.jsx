import React, { useState } from "react";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { useToastContext } from "../../../contexts/user/ToastContext";

const RequestButton = (props) => {
  const { session, userInfo, userPreferences, loading } = useAuth();

  const [isSent, setIsSent] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToastContext();

  // either push to, or update request table
  const handleClick = async () => {
    setIsLoading(true);
    // check if there is already a request from this user that you want to send a request to
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
      const request = await response.json();
      console.log(request);
      // if there is already a request, mark this request as completed
      if (request.length !== 0) {
        console.log("req sent before");
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
            body: JSON.stringify({ to: request[0].to, from: request[0].from }),
          }
        );

        if (response1.ok) {
          setIsLoading(false);
        } else {
          throw new Error();
        }

        showToast("Successfully matched.");
      } else {
        console.log("start");
        const response1 = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/api/newrequest`,
          {
            method: "POST",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
              from: session.user.id,
              to: props.pm.id,
            }),
          }
        );

        console.log("end");

        if (response1.ok) {
          setIsLoading(false);
        } else {
          throw new Error();
        }

        showToast("Request Sent");
      }

      setIsSent(true);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      showToast("Error sending request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="bg-orange-950 text-white rounded-full"
        onClick={handleClick}
        disabled={isSent}
      >
        <p className="p-1 text-sm">
          {isLoading ? "Sending..." : isSent ? "Request Sent" : "Send Request"}
        </p>
      </button>
    </div>
  );
};

export default RequestButton;
