import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://kryptohub-be.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
export default axiosClient;
