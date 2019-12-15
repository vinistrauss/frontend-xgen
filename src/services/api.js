import axios from "axios";

const api = axios.create({
  baseURL: "http://54.87.128.238/api"
});

export default api;
