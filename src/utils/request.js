import axios from "axios";
import {toast} from "react-toastify";

let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 120000,
});

request.interceptors.request.use(
  (config) => {
    const isPublicApi =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    if (isPublicApi) {
      config.headers["Authorization"] = `Token ${isPublicApi}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.code !== "ERR_CANCELED")
      if (error?.response?.status === 404) {
        toast.warn(
          `${error?.response?.status}: ${error?.response?.statusText}`
        );
      } else {
        window.location.pathname !== "/login" &&
        toast.warn(
          `${error?.response?.status}: ${
            error?.response?.data?.detail || error?.response?.statusText
          }`
        );
      }
    return Promise.reject(error);
  }
);

export const httpClient = request;
