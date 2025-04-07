import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import RecruiterImage from "../Images/recruiter.svg";
import TalentImage from "../Images/talent.svg";

const Register = () => {
  const [selection, setSelection] = useState("");

  return (
    <div className="register-container">
      <h1 className="register-title">Join as a recruiter or candidate</h1>

      <div className="options-container">
        {/* Recruiter Option */}
        <div
          className={`option-card ${selection === "recruteur" ? "selected" : ""}`}
          onClick={() => setSelection("recruteur")}
        >
          <div className="option-content">
            <img src={RecruiterImage} alt="Recruiter" />
            <p className="option-title">I’m a recruiter, hiring for a project</p>
          </div>
          {selection === "recruteur" && <span className="selected-indicator">✔</span>}
        </div>

        {/* Candidate Option */}
        <div
          className={`option-card ${selection === "candidat" ? "selected" : ""}`}
          onClick={() => setSelection("candidat")}
        >
          <div className="option-content">
            <img src={TalentImage} alt="Talent" />
            <p className="option-title">I’m a candidate, looking for work</p>
          </div>
          {selection === "candidat" && <span className="selected-indicator">✔</span>}
        </div>
      </div>

      <Link
        to={selection === "candidat" ? "/RegisterTalent" : "/RegisterRecruiter"}
        style={{ textDecoration: "none" }}
      >
        <button className={`join-button ${selection ? "active" : "disabled"}`}>
          {selection === "recruteur" ? "Join as Recruiter" : "Join as Candidate"}
        </button>
      </Link>

      <div className="login-text">
        Already have an account? <Link to="/Login" className="login-link">Log In</Link>
      </div>
    </div>
  );
};

export default Register;
