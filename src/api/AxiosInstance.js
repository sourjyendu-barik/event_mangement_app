import axios from "axios";

export const AxiosInstance = axios.create({
  // baseURL: "http://localhost:5000/",
  baseURL: "https://event-mangement-six.vercel.app/",
  timeout: 10000,
  withCredentials: true, // This enables sending/receiving cookies
  headers: { "Content-Type": "application/json" },
});
