import React, { useState } from "react";
import "./Login.css";
import emailIcon from "../Images/Email-icon.svg";
import passwordIcon from "../Images/Password-icon.svg";
import eyeOpenIcon from "../Images/Eye-icon.svg";
import eyeClosedIcon from "../Images/eye-close.png";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../Contexts/AuthContext";
import { login } from "../Services/UserServices"; // Import du service login

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useUserContext(); // Mise à jour du contexte utilisateur

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError(null);

    try {
      // const user  = await login(email, password);
      const response = await login(email, password);
      const user = response.data.user;
      console.log("response",response)

      // Stocker le token dans localStorage
      localStorage.setItem("token", user.token);

      // Mettre à jour le contexte utilisateur
      setUser(user);

      // Redirection en fonction du rôle
      if (user.role === 0) {
        navigate("/HomeAdmin"); // Admin
      } else if (user.role === "recruteur") {
        navigate("/HomeRecruiter"); 
      } else {
        navigate("/HomeTalent"); 
      }

    } catch (error) {
      setLoginError(error.response?.data?.message || "Échec de la connexion.");
    }
  };
  return (
    <div className="login-form">
      <h2 className="login-title">Log in to Khadamni</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <img src={emailIcon} alt="Email" className="input-icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <img src={passwordIcon} alt="Password" className="input-icon" />
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <img
            src={passwordVisible ? eyeOpenIcon : eyeClosedIcon}
            alt="Toggle visibility"
            className="toggle-icon"
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        </div>
        {loginError && <p className="error-message-Login">{loginError}</p>}

        <div className="forgot-password-link">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <button className="log-in-button" type="submit">
          Continue
        </button>
      </form>
      <div className="container">
        <span className="text">----- Don’t have an Account? -----</span>
      </div>
      <Link style={{ textDecoration: "none" }} to="/Register">
        <button className="sign-up-Button" type="submit">
          Sign up
        </button>
      </Link>
    </div>
  );
};

export default Login;
