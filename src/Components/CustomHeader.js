import { Typography } from "antd";
import React from "react";
import { useUserContext } from "../Contexts/AuthContext";

const CustomHeader = () => {
  const { user } = useUserContext();

  console.log("Current user:", user); // Log pour voir la valeur de user

  return (
    <Typography.Title
      level={3}
      type="secondary"
      style={{ marginBottom: "10px" }}
    >
      Welcome, {user ? user.nom : "Guest"}
    </Typography.Title>
  );
};

export default CustomHeader;
