import axios from "axios";

const baseUrl = "http://localhost:3000/";

const api = axios.create({
  baseUrl,
  timeout: 10000,
});

const token = localStorage.getItem("token");

axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";

export default api;
