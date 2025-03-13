import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home/Home";
import RegisterTalent from "./Pages/RegisterTalent";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import React, { useEffect, useState } from "react";
import Login from "./Pages/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import RegisterRecruiter from "./Pages/RegisterRecruiter";
import HomeRecruiter from "./Pages/HomeRecruiter";
import HomeTalent from "./Pages/HomeTalent";
import HomeAdmin from "./Pages/HomeAdmin";

import { useUserContext } from "./Contexts/AuthContext";
import Sidebar from "./Components/Sidebar";
import { Button, Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import CreateOffre from "./Pages/CreateOffre";
import OffreList from "./Pages/OffreList";
import UpdateOffre from "./Pages/UpdateOffre"; // Import your update page

const { Sider, Content } = Layout;

function App() {
  const { user } = useUserContext();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Rediriger automatiquement après connexion ou inscription
  useEffect(() => {
    if (user) {
      if (user.role === 0) {
        navigate("/HomeAdmin");
      } else if  (user.role === "recruteur" )  {
        navigate("/HomeRecruiter");
      } else {
        navigate("/HomeTalent");
      }
    }
  }, [user, navigate]);

  return (
    <div className={user ? "dashboard" : ""}>
      {user ? (
        <Layout className="layout">
          <Sider
            theme="light"
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="sider"
          >
            <Sidebar collapsed={collapsed} />
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="trigger-btn"
            />
          </Sider>
          <Layout className="site-layout">
            <Content className="content">
              <Routes>
                <Route path="/HomeTalent" element={<HomeTalent />} />
                <Route path="/HomeRecruiter" element={<HomeRecruiter />} />
                <Route path="/HomeAdmin" element={<HomeAdmin/>} />

                {/* Routes pour la gestion des offres */}
                <Route path="/offres/new" element={<CreateOffre />} />
                <Route path="/offres" element={<OffreList />} />
                <Route path="/deleteoffre/:id" element={<OffreList />} />
                <Route path="/offres/edit/:id" element={<UpdateOffre />} />

                
              </Routes>
            </Content>
          </Layout>
        </Layout>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/RegisterTalent" element={<RegisterTalent />} />
            <Route path="/RegisterRecruiter" element={<RegisterRecruiter />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;