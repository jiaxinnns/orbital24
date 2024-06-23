import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { socket } from "../../../../socket";
import { useNavigate } from "react-router-dom";
import ably from "../../../../ably";

const ChatButton = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { session, userInfo, userPreferences, loading } = useAuth();
  const room = props.chatId;

  const [joined, setJoined] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const channel = ably.channels.get(room);

    if (userInfo && joined) {
      channel.attach();
      channel.once("attached", () => {
        console.log(`Joined room: ${room}`);
      });

      return () => {
        channel.detach();
        console.log(`Left room: ${room}`);
      };
    }
  }, [joined, room, userInfo]);

  const handleJoinChat = () => {
    localStorage.setItem("other_user", props.user);
    localStorage.setItem("chatID", room);

    navigate("/chat", { state: { room: room, user: props.user } });
    if (userInfo && !joined) {
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
