import { Typography } from "antd";
import React from "react";
import { useUserContext } from "../Contexts/AuthContext";

const CustomHeader = () => {
  const { user } = useUserContext();

  return (
    <Typography.Title
      level={3}
      type="secondary"
      style={{ marginBottom: "10px" }}
    >
      Welcome , {user.username}
    </Typography.Title>
  );
};

export default CustomHeader;
