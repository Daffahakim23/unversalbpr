import axios from "axios";

const api = axios.create({
  baseURL: "http://10.14.52.233:8001",
});

export default api;
