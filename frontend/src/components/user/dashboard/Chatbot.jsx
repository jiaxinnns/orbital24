import React, { useState } from "react";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { Card } from "@chakra-ui/react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { session, userInfo } = useAuth();

  const sendMessage = async (e) => {
    e.preventDefault();
    setMessages((m) => [...m, { text: input, user: "user" }]);
    console.log(input);
    let response;

    if (
      session?.user.email !== "f@gmail.com" &&
      session?.user.email !== "jiaxin@gmail.com"
    ) {
      response =
        "Sorry, only our mentor can access this feature to prevent abuse.";
    } else {
      response = await fetchMessage(input);
    }

    console.log(response);
    setMessages((m) => [...m, { text: response, user: "bot" }]);
    setInput("");
  };

  const fetchMessage = async (input) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_APP_API_URL || "http://localhost:4000"
      }/api/chatbot`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      }
    );
    const data = await response.json();
    return data.bot;
  };

  return (
    <div className="h-full w-full flex justify-center">
      <Card
        className="h-full w-full"
        style={{ maxHeight: "48rem", minHeight: "36rem" }}
      >
        <div className="flex flex-col w-full bg-orange-950 rounded-t-lg text-white p-4">
          <p className="text-2xl font-bold">AI helper</p>
          <p className="text-lg">Ask me anything related to NUS!</p>
        </div>
        <div
          className="flex flex-col p-4 h-full w-full overflow-auto "
          style={{ maxHeight: "36rem" }}
        >
          {messages && messages.length > 0 ? (
            messages.map((m, index) => (
              <div
                key={index}
                className={`${
                  m.user === "user"
                    ? "self-end bg-orange-100 text-right"
                    : "self-start bg-gray-300 text-left"
                } rounded-lg p-2 max-w-md mb-2`}
              >
                <div className="flex flex-col p-2">
                  <strong>{m?.user == "user" ? "You" : "AI"}</strong>
                  <p>{m?.text}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-200 rounded-2xl p-2 px-8">
              For anonymity, message data will be wiped once you leave the page.
            </div>
          )}
        </div>
        <form onSubmit={sendMessage} className="flex p-4 gap-x-6 w-full">
          <input
            type="text"
            placeholder="Enter your message"
            value={input}
            className="input border 
          border-gray-300
          rounded-md
          focus:outline-none
          focus:ring-0
          focus:border-2
          focus:border-orange-950
          placeholder: pl-4
          w-full"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-orange-950 text-white focus:outline-gray-300 border-0"
          >
            <p className="pl-3 pr-3 pt-1 pb-1">Send</p>
          </button>
        </form>
        <p className="italic text-sm text-gray-500 pb-3">
          Some responses are outdated because we are using the cheapest openAI
          model.
        </p>
      </Card>
    </div>
  );
};

export default Chatbot;
