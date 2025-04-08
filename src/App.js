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
import TalentApplication from "./Pages/TalentApplication"; // Import TalentApplication
import RecruiterApplications from "./Pages/RecruiterApplications"; // Adjust path as needed

import { useUserContext } from "./Contexts/AuthContext";
import Sidebar from "./Components/Sidebar";
import { Button, Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import CreateOffre from "./Pages/CreateOffre";
import OffreList from "./Pages/OffreList";
import UpdateOffre from "./Pages/UpdateOffre";
import ApplyPage from "./Pages/ApplyPage"; 
import OfferDetails from "./Pages/OffreDetails";
import JobList from "./Pages/JobList";
import Offers from "./Pages/Offers";
import TalentProfile from "./Pages/TalentProfile";
import TalentOfferList from "./Pages/TalentOfferList";
import DashboradTalent from "./Pages/DashboradTalent"
import RecruiterOffersList from "./Pages/RecruiterOffersList";
const { Sider, Content } = Layout;

function App() {
  const { user } = useUserContext();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Automatically redirect after login or register
  useEffect(() => {
    if (user) {
      if (user.role === 0) {
        navigate("/HomeAdmin");
      } else if (user.role === "recruteur") {
        navigate("/HomeRecruiter");
      } else {
        navigate("/HomeTalent");
      }
    }
  }, [user]);

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
              <Route path="/" element={<Home />} />
                <Route path="/HomeTalent" element={<DashboradTalent/>} />
                <Route path="/HomeRecruiter" element={<HomeRecruiter />} />
                <Route path="/HomeAdmin" element={<HomeAdmin />} />
                <Route path="/candidat/:id" element={<TalentProfile candidatId={user.id}/>} />
                <Route path="/Offers" element={<Offers />} />

                {/* Routes for Talent Application */}
                <Route path="/TalentApplication" element={<TalentApplication />} />
                <Route path="/recruiter-applications" element={<RecruiterApplications recruteurId={user.id} />} />
                <Route path="/RecruiterOffersList" element={<RecruiterOffersList recruteurId={user.id} />} />

                {/* Routes for managing offers */}
                <Route path="/offres/new" element={<CreateOffre />} />
                <Route path="/offres" element={<OffreList />} />
                <Route path="/deleteoffre/:id" element={<OffreList />} />
                <Route path="/offres/edit/:id" element={<UpdateOffre />} />
                <Route path="/apply/:id" element={<ApplyPage />} />
                <Route path="/OfferDetails/:id" element={<OfferDetails />} />
                <Route path="/TalentOfferList" element={<TalentOfferList/>} />
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
            <Route path="/offers" element={<Offers/>} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
