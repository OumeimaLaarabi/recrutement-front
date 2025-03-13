import React from "react";
import "./Home.css";
import logo from "../../Images/logo.png";

import HomeImage from "../../Images/Illustration.svg";
import CloudImg from "../../Images/CLoud.svg";
import designImg from "../../Images/UI&UX.svg";
import IOT from "../../Images/IOT.svg";
import mobile from "../../Images/Mobile.svg";
import webImg from "../../Images/web.svg";
import IA from "../../Images/IA.svg";
import RecruiterImage from "../../Images/recruiter.svg";
import TalentImage from "../../Images/talent.svg";
import AboutImg from "../../Images/rafiki.svg";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const HomeComponent = () => {
  return (
    <div>
      <div className="home" id="home">
        <div className="hero-left">
          <h2>
            Unlock your career potential with our <br /> premier{" "}
            <span>recruitment platform</span>
          </h2>
          <h6>
            Connecting Talent with Opportunity: Your Path to Success Starts Here
          </h6>
          <Link style={{ textDecoration: "none" }} to="/Register">
            <div className="start-button">
              {" "}
              <div>Get started</div>
            </div>
          </Link>
        </div>
        <div className="Home-right">
          <img src={HomeImage} alt="" />
        </div>
      </div>
      <div className="container" id="services">
        <div className="Service-container">
          <h1>
            Elevate Your Career <br /> Find Your Perfect Fit Today
          </h1>
          <p>"Discover Your Dream Job: Start Your Journey Today"</p>
        </div>
        <div className="Service-item">
          <div className="block">
            <img src={webImg} alt="" />
            <h3>Web Development</h3>
          </div>
          <div className="block">
            <img src={IA} alt="" />
            <h3>IA</h3>
          </div>
          <div className="block">
            <img src={CloudImg} alt="" />
            <h3>Cloud</h3>
          </div>
        </div>
        <div className="Service-item">
          <div className="block">
            <img src={designImg} alt="" />
            <h3>UI & UX</h3>
          </div>
          <div className="block">
            <img src={IOT} alt="" />
            <h3>IOT</h3>
          </div>
          <div className="block">
            <img src={mobile} alt="" />
            <h3>Mobile Development</h3>
          </div>
        </div>
      </div>
      <div className="Community-container" id="community">
        <div className="Tittle-container">
          <h1>Building Stronger Communities</h1>
        </div>
        <div className="community-row">
          <div className="Community-left">
            <img src={RecruiterImage} alt="Recruiter Icon" />
            <h3>Recruiters</h3>
            <p>
              Create, manage, and publish job offers with detailed descriptions.
              Customize the application process for candidates.
            </p>
          </div>
          <div className="Community-right">
            <img src={TalentImage} alt="Talent Icon" />
            <h3>Talent</h3>
            <p>
              Create your profile, explore job offers, and easily apply online.
              Track the status of your applications.
            </p>
          </div>
        </div>
      </div>
      <div className="About" id="about">
        <div className="about-left">
          <img src={AboutImg} alt="" />
        </div>
        <div className="About-right">
          <h2>
            Transforming Talent Acquisition <br />
            for a Connected World
          </h2>
          <div className="description">
            <p>
              Khademni is a state-of-the-art recruitment platform dedicated
              <br />
              to revolutionizing the talent acquisition landscape for employers
              and job seekers alike.
              <br />
              Our platform is meticulously crafted with innovative features and
              a user-friendly interface,
              <br />
              empowering organizations to efficiently discover and connect with
              top-tier talent
              <br />
              while enabling job seekers to explore exciting career
              opportunities seamlessly.
            </p>
          </div>
        </div>
      </div>
      <div className="Footer">
        <div className="footer-left">
          <img src={logo} alt="Khadamni Logo" />
        </div>

        <div className="footer-right">
          <h5>Quick Links</h5>
          <ul>
            <li>
              <HashLink style={{ textDecoration: "none" }} to="/#home">
                {" "}
                <a className="menu-item">Home </a>{" "}
              </HashLink>
            </li>
            <li>
              <HashLink
                to="/#services"
                style={{ textDecoration: "none" }}
                className="menu-item"
              >
                Services{" "}
              </HashLink>
            </li>
            <li>
              <HashLink
                to="/#community"
                style={{ textDecoration: "none" }}
                className="menu-item"
              >
                Community{" "}
              </HashLink>
            </li>
            <li>
              <HashLink
                to="/#about"
                style={{ textDecoration: "none" }}
                className="menu-item"
              >
                About{" "}
              </HashLink>
            </li>{" "}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
