import axios from "axios";

const api = axios.create({
  baseURL: "http://10.14.237.130:8001",
});

export default api;
