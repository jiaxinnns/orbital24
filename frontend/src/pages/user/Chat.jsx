import React, { useEffect, useState } from "react";
import { Card } from "@chakra-ui/react";
import ChatButton from "../../components/user/view-matches/ChatButton";
import { socket } from "../../../socket";
import { useAuth } from "../../contexts/auth/AuthContext";
import { useLocation } from "react-router-dom";
import UserNav from "../../components/user/nav/UserNav";
//import e from "express";
const Chat = (props) => {
  const { session, userInfo, userPreferences, loading } = useAuth();

  const { state } = useLocation();

  // get chatID and user info

  const room = state?.room || localStorage.getItem("chatID");
  const otherUser = state?.user || localStorage.getItem("other_user");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!room) {
      return;
    }
    // save chatId and user info to local storage
    localStorage.setItem("chatID", room);
    localStorage.setItem("other_user", otherUser);

    // TODO: fetch from database first
    const fetchChatMessages = async () => {
      try {
        const chat_id = room;
        const response = await fetch(`/api/getmessages?chat_id=${chat_id}`);
        const data = await response.json();

        setMessages(data);
        console.log(data);

        console.log(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchChatMessages();
    // console.log(messages);
  }, [room]);

  const [inputMessage, setInputMessage] = useState("");

  const handleNewMessage = async (m) => {
    // const exists = messages.some((msg) => msg.message === m.message);
    console.log(m);

    const newMessage = {
      chat_id: room,
      sender_id: m.sender_id,
      sender_name: m.sender_name,
      message: m.message,
      timestamp: new Date(),
    };

    setMessages((messages) => [...messages, newMessage]);
    // TODO: add to database
    try {
      await fetch("/api/newmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const handleNewConnection = () => {
    console.log("new connection");
  };

  const handleNotification = (message) => {
    alert(message);
  };

  useEffect(() => {
    socket.on("connect", handleNewConnection);

    socket.on("notification", handleNotification);

    socket.on("message", handleNewMessage);

    // clean up listeners on dismount
    return () => {
      socket.off("connect", handleNewConnection);
      socket.off("notification", handleNotification);
      socket.off("message", handleNewMessage);
    };
  }, []);

  const onSendMessage = async (message) => {
    const name = userInfo && userInfo.name;
    const id = userInfo && userInfo.id;
    const newMessage = {
      chat_id: state?.room,
      sender_id: session?.user.id,
      sender_name: userInfo?.name,
      message: message,
      timestamp: new Date(),
    };

    console.log("sending...");
    socket.emit("messageRoom", {
      room: room,
      message: newMessage,
    });

    console.log("sending");
    console.log(messages);
  };
  const handleSend = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const getTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  return (
    <div className="flex flex-col w-screen h-screen font-serif bg-orange-50 items-center">
      <UserNav />
      <div className="flex w-full h-full justify-center p-8">
        <Card className="h-3/4 w-2/3 flex justify-center">
          <div className="flex flex-col w-full bg-orange-950 rounded-t-lg text-white p-4">
            <p className="text-2xl font-bold">{otherUser.name}</p>
            <p className="text-lg">
              {otherUser.faculty} | {otherUser.gender}
            </p>
          </div>
          <div className="flex flex-col p-4 w-full overflow-auto">
            {messages &&
              messages.length > 0 &&
              messages.map((m, index) => (
                <div
                  key={index}
                  className={`${
                    m.sender_id === session?.user.id
                      ? "self-end bg-orange-100 text-right"
                      : "self-start bg-gray-300 text-left"
                  } rounded-lg p-2 max-w-md mb-2`}
                >
                  <div className="flex flex-col p-2">
                    <strong>{m?.sender_name}</strong>
                    <p>{m?.message}</p>
                    <p className="text-xs text-gray-700 italic">
                      {getTime(m.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <form
            onSubmit={handleSend}
            className="flex p-4 gap-x-6 justify-center w-full"
          >
            <input
              type="text"
              placeholder="Enter your message"
              value={inputMessage}
              className="input border 
          border-gray-300
          rounded-md
          focus:outline-none
          focus:ring-0
          focus:border-2
          focus:border-orange-950
          placeholder: pl-4
          w-full"
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-orange-950 text-white focus:outline-gray-300 border-0"
            >
              <p className="pl-3 pr-3 pt-1 pb-1">Send</p>
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
