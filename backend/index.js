import { createClient } from "@supabase/supabase-js";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
//const router = require("./routes/router");
dotenv.config({
  path: "../.env", //give .env file location
});

console.log(process.env.VITE_APP_SUPABASE_URL);
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

app.get("/api/users", async (req, res) => {
  console.log(req.query.email);
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("email", req.query.email);
  console.log(data);
  data[0] && res.json([{ id: data[0].id }]);
});

app.post("/api/userinfo", async (req, res) => {
  console.log("req:" + req.body.id);
  const { error } = await supabase.from("user_info").insert({
    id: req.body.id,
    name: req.body.name,
    faculty: req.body.faculty,
    gender: req.body.gender,
  });
  if (error) {
    console.log(error);
    res.send(error);
  } else {
    res.send("Account Created!");
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
