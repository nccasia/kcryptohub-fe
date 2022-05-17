import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api",
  // baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
export default axiosClient;
