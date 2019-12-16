import axios from "axios";

const api = axios.create({
  // baseURL: "https://localhost:5001/api"
  baseURL: "http://3.82.102.10/api"
});

export default api;
