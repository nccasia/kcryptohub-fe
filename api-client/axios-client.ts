import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://kryptohub-be.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data)
);
export default axiosClient;
