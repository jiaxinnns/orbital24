import axios from "axios";

const baseURL = "http://localhost:4000";

const instance = axios.create({
  // .. configure axios baseURL
  baseURL: "http://localhost:4000",
});

export default instance;
