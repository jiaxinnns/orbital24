import { createClient } from "@supabase/supabase-js";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import serverless from "serverless-http";
import Ably from "ably";

import { Server } from "socket.io";

//const router = require("./routes/router");
dotenv.config({
  path: "../../.env", //give .env file location
});

const supabase = createClient(
  process.env.VITE_APP_SUPABASE_URL,
  process.env.VITE_APP_ANON_KEY
);

const ably = new Ably.Realtime(process.env.VITE_APP_ABLY_API_KEY);

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

const port = 4000;

// get timer logs based on user ID
app.get("/api/getlogs", async (req, res) => {
  const { user_id } = req.query;
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const { data, error } = await supabase
    .from("timer")
    .select()
    .eq("user_id", user_id)
    .gte("created_at", oneWeekAgo.toISOString());

  if (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

// add new log to timer
app.post("/api/newtimer", async (req, res) => {
  try {
    // Insert message into the database
    const { data, error } = await supabase.from("timer").insert([
      {
        created_at: new Date(),
        ended_at: new Date(),
        user_id: req.body.id,
        user_name: req.body.name,
        duration: req.body.duration,
      },
    ]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error saving record:", error);
    res.status(500).json({ error: error.message });
  }
});

// add new message to chat
app.post("/api/newmessage", async (req, res) => {
  const { chat_id, sender_id, sender_name, message, timestamp } = req.body;

  try {
    // Insert message into the database
    const { data, error } = await supabase
      .from("chat_messages")
      .insert([{ chat_id, sender_id, sender_name, message, timestamp }]);

    if (error) {
      throw error;
    }

    // Publish message to the Ably channel
    const channel = ably.channels.get(chat_id);
    channel.publish("message", {
      chat_id,
      sender_id,
      sender_name,
      message,
      timestamp,
    });

    console.log("UPDATED");

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: error.message });
  }
});

// fetch chats according to chat ID
app.get("/api/getmessages", async (req, res) => {
  const { chat_id } = req.query;
  const { data, error } = await supabase
    .from("chat_messages")
    .select()
    .eq("chat_id", chat_id)
    .order("timestamp", { ascending: true })
    .limit(100);

  if (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

// fetch requests according to 'from' and 'to' ID
app.get("/api/requests", async (req, res) => {
  const { data, error } = await supabase
    .from("requests")
    .select()
    .eq("to", req.query.to)
    .eq("from", req.query.from);
  data && res.json(data);
});

// fetch incomplete and NON-declined requests according to 'to' ID
app.get("/api/incompleterequeststo", async (req, res) => {
  const { data, error } = await supabase
    .from("requests")
    .select()
    .eq("to", req.query.to)
    .eq("completed", false)
    .eq("declined", false);
  data && res.json(data);
});

// fetch complete requests according to 'to' ID
app.get("/api/completerequeststo", async (req, res) => {
  const { data, error } = await supabase
    .from("requests")
    .select()
    .eq("to", req.query.to)
    .eq("completed", true)
    .eq("declined", false);
  data && res.json(data);
});

// fetch complete requests according to 'from' ID
app.get("/api/completerequestsfrom", async (req, res) => {
  const { data, error } = await supabase
    .from("requests")
    .select()
    .eq("from", req.query.from)
    .eq("completed", true)
    .eq("declined", false);
  data && res.json(data);
});

// complete (ie. accept) existing request according to to & from ID
app.post("/api/completerequest", async (req, res) => {
  // update user table
  const { data, error1 } = await supabase
    .from("user_info")
    .select()
    .eq("id", req.body.to);

  const requested = data[0] && data[0].requested;
  requested && requested.push(req.body.from);

  const { error2 } = await supabase
    .from("user_info")
    .update({
      requested: requested,
    })
    .eq("id", req.body.to);

  // update request table
  const { error } = await supabase
    .from("requests")
    .update({
      completed: true,
    })
    .eq("to", req.body.to)
    .eq("from", req.body.from);
  error && res.send(error);
  !error && res.send("Accepted");
});

// decline existing request according to request ID
app.post("/api/declinerequest", async (req, res) => {
  // update requests table
  const { error } = await supabase
    .from("requests")
    .update({
      declined: true,
    })
    .eq("id", req.body.id);

  error && res.send(error);
  !error && res.send("Declined");
});

// add new request
app.post("/api/newrequest", async (req, res) => {
  // update request table
  const { error } = await supabase.from("requests").insert([
    {
      to: req.body.to,
      from: req.body.from,
      completed: false,
    },
  ]);

  // update user table
  const { data, error1 } = await supabase
    .from("user_info")
    .select()
    .eq("id", req.body.from);

  const requested = data[0] && data[0].requested;
  requested && requested.push(req.body.to);

  const { error2 } = await supabase
    .from("user_info")
    .update({
      requested: requested,
    })
    .eq("id", req.body.from);

  !error && !error1 && !error2 && res.send("New request made");
});

// hide user
app.post("/api/hide", async (req, res) => {
  // update user table
  const { data, error1 } = await supabase
    .from("user_info")
    .select()
    .eq("id", req.body.from);

  const ignore = data[0] && data[0].ignore;
  ignore && ignore.push(req.body.to);

  const { error2 } = await supabase
    .from("user_info")
    .update({
      ignore: ignore,
    })
    .eq("id", req.body.from);

  !error1 && !error2 && res.send("Hidden");
});

// fetch user according to email
app.get("/api/users", async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("email", req.query.email);
  data[0] && res.json([{ id: data[0].id }]);
});

// fetch random user info (limit of 20)
app.get("/api/allusers", async (req, res) => {
  // get number of rows

  const { count, error1 } = await supabase
    .from("user_info")
    .select("*", { count: "exact", head: true });

  console.log(count);

  // default range
  let start = 0;
  let end = Math.min(count, 20) - 1;

  // if more than 20 users, rng a starting point more than 20 away from the endpoint

  if (count > 20) {
    start = Math.floor(Math.random() * (count - 20));
    end = start + 19;
  }

  const { data, error } = await supabase
    .from("user_info")
    .select()
    .range(start, end);

  console.log(data);
  data && res.json(data);
});

// get user info by ID
app.get("/api/getuserinfo", async (req, res) => {
  const { data, error } = await supabase
    .from("user_info")
    .select()
    .eq("id", req.query.id);
  data[0] && res.json(data[0]);
});

// get user preference by ID
app.get("/api/getuserpreferences", async (req, res) => {
  const { data, error } = await supabase
    .from("user_preferences")
    .select()
    .eq("id", req.query.id);
  data[0] && res.json(data[0]);
});

// add user information
app.post("/api/userinfo", async (req, res) => {
  const { error } = await supabase.from("user_info").insert({
    id: req.body.id,
    name: req.body.name,
    faculty: req.body.faculty,
    gender: req.body.gender,
  });

  // set preferences to default values
  const { error1 } = await supabase.from("user_preferences").insert({
    id: req.body.id,
    faculty: "No preference",
    gender: "No preference",
    study_spot: "No preference",
  });

  if (error) {
    console.log(error);
    res.send(error);
  } else {
    res.send("Account Created!");
  }
});

// add user preferences
app.post("/api/userpreferences", async (req, res) => {
  const { data, error } = await supabase
    .from("user_preferences")
    .update({
      id: req.body.id,
      faculty: req.body.faculty,
      gender: req.body.gender,
      study_spot: req.body.studyspot,
    })
    .eq("id", req.body.id)
    .select();

  if (error) {
    console.log(error);
    res.send(error);
  } else {
    console.log(data);
    res.send("Preferences updated");
  }
});

app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body || "not found");
  res.send("lol");
});

app.get("/", async (req, res) => {
  res.send("hello world");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET, POST"],
  },
});

// io.on("connection", (socket) => {
//   console.log("new connection");
//   // socket.emit("message", "welcome to chat");

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });

//   socket.on("join", ({ room, name }) => {
//     console.log("join", room, name);
//     socket.join(room);
//     io.to(room).emit("notification", `${name} joined ${room}.`);
//   });

//   socket.on("messageRoom", ({ room, message }) => {
//     console.log("message", room, message.sender_name, message.message);
//     io.to(room).emit("message", message);
//   });
// });

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;

export const handler = serverless(app);
