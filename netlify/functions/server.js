import { createClient } from "@supabase/supabase-js";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";

//const router = require("./routes/router");
dotenv.config({
  path: "../../.env", //give .env file location
});

const supabase = createClient(
  process.env.VITE_APP_SUPABASE_URL,
  process.env.VITE_APP_ANON_KEY
);

const app = express();

//app.use(bodyParser.json());
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
//app.use("/", router);

const port = 4000;

// app.get("/api/signin/:hi", async (req, res) => {
//   // const { data, error } = await req.params.supabase.auth.signInWithPassword({
//   //   email: req.params.email,
//   //   password: req.params.password,
//   // });
//   // console.log("signed in");
//   // data && console.log(data);
//   // data && res.send(data);
//   // error && res.send(error);
//   // error && console.log(error);
//   // res.send("hi");
//   console.log(req.params || "not found");
//   res.send("lol");
// });

// fetch requests according to 'from' and 'to' ID
app.get("/api/requests", async (req, res) => {
  const { data, error } = await supabase
    .from("requests")
    .select()
    .eq("to", req.query.to)
    .eq("from", req.query.from);
  data && res.json(data);
});

// fetch incomplete requests according to 'to' ID
app.get("/api/incompleterequeststo", async (req, res) => {
  const { data, error } = await supabase
    .from("requests")
    .select()
    .eq("to", req.query.to)
    .eq("completed", false);
  data && res.json(data);
});

// complete existing request according to request ID
app.post("/api/completerequest", async (req, res) => {
  // console.log(req.query.email);
  const { data, error } = await supabase
    .from("requests")
    .update({
      completed: true,
    })
    .eq("id", req.body.id);
  data && res.json(data);
});

// add new request
app.post("/api/newrequest", async (req, res) => {
  // console.log(req.query.email);
  const { error } = await supabase.from("requests").insert([
    {
      to: req.body.to,
      from: req.body.from,
      completed: false,
    },
  ]);

  error && console.log(error);
  !error && res.send("Completed");
});

// fetch user according to email
app.get("/api/users", async (req, res) => {
  console.log(req.query.email);
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("email", req.query.email);
  data[0] && res.json([{ id: data[0].id }]);
});

// fetch random user info (limit of 50)
app.get("/api/allusers", async (req, res) => {
  const { data, error } = await supabase.from("user_info").select().range(0, 9);
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;

export const handler = serverless(app);
