import axios from "axios";
import BASE_URL from "../config";

const api = axios.create({
  baseURL: BASE_URL, // Set the base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;