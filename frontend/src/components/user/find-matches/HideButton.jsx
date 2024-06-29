import React, { useState } from "react";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { useToastContext } from "../../../contexts/user/ToastContext";
const HideButton = (props) => {
  const { session, userInfo, userPreferences, loading } = useAuth();
  const { showToast } = useToastContext();

  const [isLoading, setIsLoading] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response1 = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/hide`,
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

      if (!response1.ok) {
        throw new Error();
      }

      showToast("We will not recommend this user again.");
      setHidden(true);
    } catch (e) {
      showToast("Error hiding user.");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-white text-black border border-black rounded-full"
        disabled={isLoading || hidden}
      >
        <p className="p-1 text-sm">
          {isLoading ? "Hiding..." : hidden ? "User Hidden" : "Hide"}
        </p>
      </button>
    </div>
  );
};

export default HideButton;
