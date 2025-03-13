import { Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import CustomHeader from "../Components/CustomHeader";
import ChartComponent from "../Components/ChartComponent";
import "./HomeAdmin.css";
import { UserOutlined, TeamOutlined } from "@ant-design/icons"; // Import icons from Ant Design

import { GetUserCountsByRole } from "../Services/UserServices";
import styled from "styled-components";

const BlockContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;

const Block = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: all 0.3s ease;
  width: 400px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.div`
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 50%;
  margin-right: 15px;
`;

const RoleTitle = styled.h2`
  margin-bottom: 5px;
`;

const RoleCount = styled.p`
  font-size: 24px;
  color: #1890ff; /* Blue color */
`;

function HomeAdmin() {
  const [userCounts, setUserCounts] = useState({});

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const data = await GetUserCountsByRole();
        setUserCounts(data);
      } catch (error) {
        console.error("Error fetching user counts:", error);
      }
    };

    fetchUserCounts();
  }, []);
  return (
    <div>
      <Header className="header">
        <CustomHeader />
      </Header>
      <div>
        <BlockContainer>
          <Block>
            <IconWrapper>
              <UserOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
            </IconWrapper>
            <div>
              <RoleTitle>Recruiters</RoleTitle>
              <RoleCount>{userCounts.Recruiter}</RoleCount>
            </div>
          </Block>

          <Block>
            <IconWrapper>
              <TeamOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
            </IconWrapper>
            <div>
              <RoleTitle>Talents</RoleTitle>
              <RoleCount>{userCounts.Talent}</RoleCount>
            </div>
          </Block>
        </BlockContainer>
      </div>
      <ChartComponent />
    </div>
  );
}

export default HomeAdmin;
