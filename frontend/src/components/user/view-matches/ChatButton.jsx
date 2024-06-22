import React, { useState } from "react";
import io from "socket.io-client";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { socket } from "../../../../socket";
import { useNavigate } from "react-router-dom";
const ChatButton = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { session, userInfo, userPreferences, loading } = useAuth();
  const room = props.chatId;

  const [joined, setJoined] = useState(false);

  const navigate = useNavigate();

  const handleJoinChat = () => {
    localStorage.setItem("other_user", props.user);
    localStorage.setItem("chatID", room);

    navigate("/chat", { state: { room: room, user: props.user } });
    if (userInfo && !joined) {
      console.log(userInfo);

      socket.emit("join", {
        room: room,
        name: userInfo.name,
      });

      setJoined(true);
    }
  };
  return (
    <div>
      <button className="bg-orange-950 text-white rounded-full">
        <p onClick={handleJoinChat} className="p-1 text-sm">
          {isLoading ? "Loading..." : "Chat Now"}
        </p>
      </button>
    </div>
  );
};

export default ChatButton;
