import { useState } from "react";
import "./Register.css";
import RecruiterImage from "../Images/recruiter.svg"; // Renamed the imported image
import TalentImage from "../Images/talent.svg"; // Renamed the imported image
import { Link } from "react-router-dom";

const Register = () => {
  const [selection, setSelection] = useState("");

  const handleSelect = (role) => {
    setSelection(role);
  };

  return (
    <div>
      <h1 className="regH1">Would you like to join us as?</h1>

      <div className="home">
        <div
          className={`home-option ${selection === "recruteur" ? "selected" : ""}`}
          onClick={() => handleSelect("recruteur")}
        >
          <div className="option-content">
            <div>
              <img src={RecruiterImage} alt="" />
              Recruteur
              <span className="radio-circle"></span>
            </div>
            <span className="option-description">
              Create, manage, and publish job offers with detailed descriptions.
              Customize the application process for candidates.
            </span>
          </div>
        </div>

        <div
          className={`home-option ${selection === "candidat" ? "selected" : ""}`}
          onClick={() => handleSelect("candidat")}
        >
          <div className="option-content">
            <div>
              <img src={TalentImage} alt="" />
              Talent
              <span className="radio-circle"></span>
            </div>
            <span className="option-description">
              Create your profile, explore job offers, and easily apply online.
              Track the status of your applications.
            </span>
          </div>
        </div>
      </div>

      <Link
        to={selection === "candidat" ? "/RegisterTalent" : "/RegisterRecruiter"}
        style={{ textDecoration: "none" }}
      >
        <div className="join-button">Join as</div>
      </Link>
      
      <div className="container">
        <span className="text">
          ----- Already have an account?
          <Link style={{ textDecoration: "none" }} to="/Login">
            <span href="/login" className="link">Log In</span>
          </Link>
          -----
        </span>
      </div>
    </div>
  );
};

export default Register;
