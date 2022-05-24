import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("accessToken");
  const accessHeader = `Bearer ${accessToken}`;
  if (request.headers) {
    request.headers["Authorization"] = accessHeader;
  }
  return request;
});
export default axiosClient;
