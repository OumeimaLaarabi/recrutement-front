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
          {user.role === "recruteur" ? (
            <Link to="/RecruiterApplications">Applications</Link>
          ) : user.role === 0 ? (
            <Link to="/RecruiterList">Recruiters</Link>
          ) : (
            <Link to="/TalentApplication">My Applications</Link>
          )}
        </Menu.Item>

        <Menu.Item key="3" icon={<ProfileOutlined />}>
          {user.role === "recruteur" ? (
            <Link to="/RecruiterProfile">Profile</Link>
          ) : user.role === 0 ? (
            <Link to="/TalentList">Talents</Link>
          ) : (
            <Link to="/ProfileTalent">Profile</Link>
          )}
        </Menu.Item>

        <Menu.Item key="5" icon={<BiBookAlt />}>
        <Link to="/offres/new">Créer une offre</Link>
        </Menu.Item>
<Menu.Item key="6" icon={<BiBookAlt />}>
  <Link to="/offres" onClick={() => navigate("/offres")}>Offres</Link>
</Menu.Item>

<Menu.Item key="4" icon={<LogoutOutlined />} disabled={loading}>
  <span onClick={loading ? null : handleLogout} style={{ cursor: loading ? "default" : "pointer" }}>
    {loading ? "Déconnexion..." : "SignOut"}
  </span>
</Menu.Item>


      </Menu>
    </>
  );
};

export default Sidebar;