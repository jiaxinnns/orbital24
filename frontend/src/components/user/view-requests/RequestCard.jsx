import React, { useState } from "react";
import AcceptRequestButton from "./AcceptRequestButton";
import DeclineRequestButton from "./DeclineRequestButton";
import { Card } from "@chakra-ui/react";
import logo from "../../../assets/logo.png";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { useToastContext } from "../../../contexts/user/ToastContext";

const RequestCard = (props) => {
  const { session, userInfo, userPreferences, loading } = useAuth();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const [isDeclining, setIsDeclining] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  const { showToast } = useToastContext();

  const handleAccept = async () => {
    setIsAccepting(true);
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
        setIsAccepting(false);
      }
    } catch (e) {
      console.log(e);
      showToast("Error accepting request.");
      setIsAccepting(false);
    } finally {
      setIsAccepting(false);
    }
  };

  const handleDecline = async () => {
    setIsDeclining(true);
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

      setIsDeclining(false);
      setIsDeclined(true);
      showToast("Request denied.");
    } catch (e) {
      console.log(e);
      setIsDeclining(false);
      showToast("Error decling request.");
    } finally {
      setIsDeclining(false);
    }
  };

  return (
    <div>
      <Card
        className="w-full"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
      >
        <img src={logo} className="w-36 p-4"></img>
        <div className="flex overflow-hidden">
          <div className="p-8 flex flex-col">
            <div className="text-2xl flex justify-start font-bold">
              {props.pm.name}
            </div>
            <div className="text-lg flex justify-start text-gray-500">
              {props.pm.gender} | {props.pm.faculty}
            </div>
            <div className="flex gap-x-2 justify-start pt-2">
              <div>
                {!isDeclined && (
                  <button
                    className="bg-orange-950 text-white rounded-full"
                    onClick={handleAccept}
                    disabled={
                      isAccepting || isAccepted || isDeclining || isDeclined
                    }
                  >
                    <p className="p-1 text-sm">
                      {isAccepting
                        ? "Accepting..."
                        : isAccepted
                        ? "Accepted"
                        : "Accept Request"}
                    </p>
                  </button>
                )}
              </div>
              <div>
                {!isAccepted && (
                  <button
                    onClick={handleDecline}
                    disabled={
                      isDeclining || isDeclined || isAccepted || isAccepting
                    }
                    className="bg-white text-black border border-black rounded-full"
                  >
                    <p className="p-1 text-sm">
                      {isDeclining
                        ? "Declining..."
                        : isDeclined
                        ? "Declined"
                        : "Decline"}
                    </p>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RequestCard;
