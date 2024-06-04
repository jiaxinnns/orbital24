const serverless = require("serverless-http");
const express = require("express");
const app = express();

// Import your existing Express app
const backendApp = require("../backend/index"); // Adjust this path if needed

app.use("/.netlify/functions/server", backendApp);

module.exports.handler = serverless(app);
