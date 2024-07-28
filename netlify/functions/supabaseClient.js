const { createClient } = require("@supabase/supabase-js");
import dotenv from "dotenv";
const supabaseUrl = "https://your-supabase-url";
const supabaseKey = "your-supabase-key";

dotenv.config({
  path: "../../../.env", //give .env file location
});

const supabase = createClient(
  process.env.VITE_APP_SUPABASE_URL,
  process.env.VITE_APP_ANON_KEY
);

module.exports = supabase;
