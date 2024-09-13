import axios from "axios";
import { API_URL } from "./constants";
import { toast } from "react-toastify";
import { logOutApi, refreshTokenApi } from "~/apis";

const instanceAxios = axios.create({
  baseURL: API_URL,
  timeout: 1000 * 60 * 5,
  withCredentials: true,
});

instanceAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

let refreshTokenPromise = null;

instanceAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      return logOutApi().then(() => {
        location.href = "/login";
      });
    }

    const originRequest = error.config;
    if (error.response?.status === 410 && originRequest) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenApi()
          .catch((_error) => {
            logOutApi().then(() => {
              location.href = "/login";
            });
            return Promise.reject(_error);
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      return refreshTokenPromise.then(() => {
        return instanceAxios(originRequest);
      });
    }

    if (error.response?.status !== 410) {
      // 410 ma GONE check het han token
      toast.error(error.response?.data?.message || error?.message);
    }

    return Promise.reject(error);
  }
);

export default instanceAxios;
