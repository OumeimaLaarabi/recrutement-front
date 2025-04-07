import React, { useState } from "react";
import { Menu, Avatar, Badge, Typography } from "antd";
import {
  UserOutlined,
  ProfileOutlined,
  OrderedListOutlined,
  LogoutOutlined,
  CalendarOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useUserContext } from "../Contexts/AuthContext";
import "./Sidebar.css";

const { Title } = Typography;

const Sidebar = ({ collapsed }) => {
  const { user, handleLogout } = useUserContext();

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "recruteur":
        return "blue";
      case "candidat":
        return "green";
      case "admin":
        return "volcano";
      default:
        return "gray";
    }
  };

  return (
    <div className="sidebar-wrapper">
      {!collapsed && user && (
        <div className="user-info-wrapper">
          <div className="user-info">
            <Avatar size="large" icon={<UserOutlined />} />
            <div>
              <div className="username">{user.prenom || "Utilisateur"}</div>
              <Badge
                count={user.role}
                color={getRoleBadgeColor(user.role)}
                className="role-badge"
              />
            </div>
          </div>
        </div>
      )}

      <div className="menu-wrapper">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="custom-menu"
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            {user.role === "recruteur" ? (
              <Link to="/HomeRecruiter">Dashboard</Link>
            ) : user.role === "candidat" ? (
              <Link to="/HomeTalent">Dashboard</Link>
            ) : (
              <Link to="/HomeAdmin">Dashboard</Link>
            )}
          </Menu.Item>

          <Menu.Item key="2" icon={<OrderedListOutlined />}>
            {user.role === "candidat" ? (
              <Link to="/TalentApplication">My Applications</Link>
            ) : (
              <Link to="/recruiter-applications">Applications</Link>
            )}
          </Menu.Item>
          <Menu.Item key="3" icon={<OrderedListOutlined />}>
            {user.role === "candidat" ? (
              <Link to="/Offers">Jobs</Link>
            ) : (
              <Link to="/Offers">Jobs</Link>
            )}
          </Menu.Item>

          <Menu.Item key="4" icon={<ProfileOutlined />}>
            {user.role === "candidat" ? (
              <Link to="/candidat/:id">Profile</Link>
            ) : (
              <Link to="/RecruiterProfile">Profile</Link>
            )}
          </Menu.Item>

          <Menu.Item key="5" icon={<CalendarOutlined />}>
            <Link to="/calendar">Calendar</Link>
          </Menu.Item>

          <Menu.Item key="6" icon={<LogoutOutlined />} onClick={handleLogout}>
            Sign Out
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
