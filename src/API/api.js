import axios from "axios";

const api = axios.create({
  // baseURL: "/api",
  baseURL: "http://10.14.237.130:8001/api",
});

export default api;
