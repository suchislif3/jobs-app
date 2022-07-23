import axios from "axios";
import { useEffect } from "react";

import { useGlobalContext } from "../context/appContext";

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const AxiosInterceptor = ({ children }) => {
  const { logout, setErrorMessage, setClientErrorMessage } = useGlobalContext();

  useEffect(() => {
    const reqInterceptor = API.interceptors.request.use(
      (req) => {
        const user = localStorage.getItem("user");

        if (user) {
          const { token } = JSON.parse(localStorage.getItem("user"));
          req.headers.authorization = `Bearer ${token}`;
        }
        return req;
      },
      (err) => {
        setErrorMessage("Something went wrong. Please try again later.");
        return Promise.reject(err);
      }
    );

    const resInterceptor = API.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.response.status === 401) {
          logout();
          setClientErrorMessage(
            err?.response?.data?.msg === "Token expired"
              ? "Token expired. Please sign in."
              : err?.response?.data?.msg || "Please sign in."
          );
        } else if (
          err.response.status >= 400 &&
          err.response.status < 500 &&
          err?.response?.data?.msg
        ) {
          setClientErrorMessage(err.response.data.msg);
        } else {
          setErrorMessage("Something went wrong. Please try again later.");
        }

        return Promise.reject(err);
      }
    );

    return () => {
      API.interceptors.request.eject(reqInterceptor);
      API.interceptors.response.eject(resInterceptor);
    };
  }, [logout, setClientErrorMessage, setErrorMessage]);

  return children;
};

export default API;
