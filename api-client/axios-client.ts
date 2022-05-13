import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use(function (request) {
  const accessToken = localStorage.getItem("accessToken");
  const authorization = `Bearer ${accessToken}`;
  if (request.headers) {
    request.headers["Authorization"] = authorization;
  }
  return request;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data)
);
export default axiosClient;
