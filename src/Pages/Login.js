import React, { useState } from "react";
import "./Login.scss";
import emailIcon from "../Images/Email-icon.svg";
import passwordIcon from "../Images/Password-icon.svg";
import eyeOpenIcon from "../Images/Eye-icon.svg";
import eyeClosedIcon from "../Images/eye-close.png";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../Contexts/AuthContext";
import { login } from "../Services/UserServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError(null);

    try {
      const response = await login(email, password);
      const user = response.data.user;
      localStorage.setItem("token", user.token);
      setUser(user);

      if (user.role === 0) {
        navigate("/HomeAdmin");
      } else if (user.role === "recruteur") {
        navigate("/HomeRecruiter");
      } else {
        navigate("/HomeTalent");
      }
    } catch (error) {
      setLoginError(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-form">
          <h2 className="login-title">Welcome</h2>
          <p>Log in to your account to continue</p>
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
            {loginError && <p className="error-message">{loginError}</p>}
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <button className="login-button" type="submit">
              Log In
            </button>
          </form>
          <div className="signup-text">
            <p>Don't have an account? <Link to="/Register">Sign up!</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
