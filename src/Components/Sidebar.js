import {React,useState} from "react";
import { BiBookAlt, BiHome } from "react-icons/bi";
import "./Sidebar.css";
import logo from "../Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../Contexts/AuthContext";
import { Flex, Menu } from "antd";
import {
  UserOutlined,
  ProfileOutlined,
  OrderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Sidebar = ({ collapsed }) => {
  const { user, handleLogout } = useUserContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Ajout du state de chargement


  return (
    <>
      <div className="logo">{!collapsed && <img src={logo} alt="" />}</div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="menu-bar"
        inlineCollapsed={collapsed}
      >
               <Menu.Item key="1" icon={<UserOutlined />}>
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

        <Menu.Item key="3" icon={<ProfileOutlined />}>
          {user.role === "candidat" ? (
            <Link to="/ProfileTalent">Profile</Link>
          ) : (
            <Link to="/RecruiterProfile">Profile</Link>
          )}
        </Menu.Item>

        <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleLogout}>
          Sign Out
        </Menu.Item>
      </Menu>
    </>

  );
};

export default Sidebar;