import axios from "axios";

const baseURL = "http://careertus.com/api/";

const api = axios.create({
  baseURL,
  timeout: 10000,
});

const token = localStorage.getItem("token");
api.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";

export default api;
