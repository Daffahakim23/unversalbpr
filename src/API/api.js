import axios from "axios";

const api = axios.create({
  baseURL: "https://10.14.237.153:3000",
});

export default api;
