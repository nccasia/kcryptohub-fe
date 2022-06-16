import axios from "axios";
import { useRouter } from "next/router";

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

axiosClient.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    const code = error.response.data.statusCode;
    switch (code) {
      case 401:
      //window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
