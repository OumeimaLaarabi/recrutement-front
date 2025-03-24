import React, { useState } from "react";
import eyeOpenIcon from "../Images/Eye-icon.svg";
import eyeClosedIcon from "../Images/eye-close.png";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterTalent.css";
import { useUserContext } from "../Contexts/AuthContext";
import { registerCandidate, confirmProfile } from "../Services/UserServices"; // Import confirmProfile
import { decodeToken } from "../Utils/TokenUtils";

const RegisterTalent = () => {
  const [prenom, setFirstName] = useState("");
  const [nom, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setPhoneNumber] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [RegisterError, setRegisterError] = useState(null);

  const { setUser } = useUserContext();

const handleSubmit = async (event) => {
  event.preventDefault();
  setRegisterError(null);

  try {
    const response = await registerCandidate(
      prenom,
      nom,
      email,
      password,
      adresse,
      telephone
    );
    console.log("Response from backend:", response); // Debugging log

    const { token } = response;

    // Verify if the token is valid
    if (typeof token === "string" && token.trim() !== "") {
      const userInfo = decodeToken(token);  // Decode token only if it's valid
      setUser (userInfo);

      // Navigate to Login after successful registration
      navigate("/login");  // Redirect to Login after registration
    } else {
      throw new Error("Invalid token received");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    if (error.response && error.response.status === 404) {
      setRegisterError("User  not found. Please check your email and try again.");
    } else if (error.response && error.response.status === 400) {
      setRegisterError("Invalid email or password. Please try again.");
    } else {
      setRegisterError("An error occurred. Please try again.");
    }
  }
};


  return (
    <div className="register-form">
      <h2>Sign up to find work you want</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <div className="input-gr half">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              value={prenom}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="input-gr half">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="input-gr">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-gr">
          <label htmlFor="adresse">Address</label>
          <input
            type="text"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            required
          />
        </div>
        <div className="input-gr">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            value={telephone}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="input-gr">
          <label htmlFor="password">Password</label>
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <img
            src={passwordVisible ? eyeOpenIcon : eyeClosedIcon}
            alt="Toggle visibility"
            className="toggle-iconn"
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        </div>
        {RegisterError && <p className="error-message-Login">{RegisterError}</p>}

        <button className="submit-button-reg" type="submit">
          Create my account
        </button>
      </form>
      <div className="container">
        <span className="text">----- Already have an account? -----</span>
      </div>
      <Link style={{ textDecoration: "none" }} to="/Login">
        <button className="sign-up-Button" type="submit">
          Login
        </button>
      </Link>
    </div>
  );
};

export default RegisterTalent;
