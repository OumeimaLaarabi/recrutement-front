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
  const [message, setMessage] = useState({ type: "", text: "" });

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

    setMessage({ type: "success", text: "Inscription réussie ! Redirection en cours..." });
    setTimeout(() => navigate("/login"));
  } catch (error) {
    setMessage({
      type: "error",
      text: error.response?.data?.message || "Une erreur est survenue, veuillez réessayer.",
    });
  }
};


  return (
    <div className="register-form">
      <h2>Sign up to find work you want</h2>
      <form onSubmit={handleSubmit}>
  {/* Nom et prénom */}
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

  {/* Email et Adresse */}
  <div className="input-row">
    <div className="input-gr half">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className="input-gr half">
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
  
  </div>

  {/* Téléphone et Mot de passe */}
  <div className="input-row">
    <div className="input-gr half">
      <label htmlFor="phoneNumber">Phone Number</label>
      <input
        type="text"
        value={telephone}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
    </div>
    <div className="input-gr half">
      <label htmlFor="adresse">Address</label>
      <input
        type="text"
        value={adresse}
        onChange={(e) => setAdresse(e.target.value)}
        required
      />
    </div>
  </div>

  {/* Erreur d'inscription */}
  {RegisterError && <p className="error-message-Login">{RegisterError}</p>}

  {/* Bouton de soumission */}
  <button className="submit-reg" type="submit">
    Create my account
  </button>
</form>
<div className="container">
   <p  className = "login-text" > Already have an account? 
  <Link to="/Login" className="sign-up-text">Login</Link> 
  </p>
</div>

    </div>
  );
};

export default RegisterTalent;
