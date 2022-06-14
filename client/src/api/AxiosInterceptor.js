import axios from "axios";
import { useEffect } from "react";

import { useGlobalContext } from "../context/appContext";

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const AxiosInterceptor = ({ children }) => {
  const { logout, setErrorMessage } = useGlobalContext();

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
        if (err?.response?.data?.message) {
          setErrorMessage(err.response.data.message);
        } else if (err.response.status === 401) {
          logout();
          setErrorMessage(
            `${
              err?.response?.data?.message === "jwt expired"
                ? "Token expired. "
                : ""
            }Please sign in.`
          );
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
  }, [logout, setErrorMessage]);

  return children;
};

export default API;
