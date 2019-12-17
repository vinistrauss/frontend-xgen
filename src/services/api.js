import axios from "axios";

const api = axios.create({
  // baseURL: "https://localhost:5001/api"
  baseURL: "http://35.168.222.0/api"
});

export default api;
