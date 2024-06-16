//import { createClient } from "@supabase/supabase-js";
const express = require("express");
const router = express.Router();
// const supabase = createClient(
//   import.meta.env.VITE_APP_SUPABASE_URL,
//   import.meta.env.VITE_APP_ANON_KEY
// );

router.put("/signin/:email-:password", async (req, res) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: req.params.email,
    password: req.params.password,
  });

  data && console.log(data);
  data && res.send(data);
  error && res.send(error);
  error && console.log(error);
});

module.exports = router;
