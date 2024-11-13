import React from "react";
import { Navigate } from "react-router-dom";
import { message } from "antd";

export const Privateroutes = ({ children }) => {
  const islogin = window.localStorage.getItem("loggedin");
  if (!islogin) {
    message.info("Please login first");

    return <Navigate to="/" />;
  }
  return children;
};
