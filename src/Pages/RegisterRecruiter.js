import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterTalent.css";
import { registerRecruiter  } from "../Services/UserServices";
import { useUserContext } from "../Contexts/AuthContext";
import { decodeToken } from "../Utils/TokenUtils";

const RegisterRecruiter = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    entrepriseName: "",
    entrepriseMatricule: "",
    entrepriseAdresse: "",
    entrepriseTelephone: "",
    entrepriseSecteur: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, password, entrepriseMatricule } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: "error", text: "Veuillez entrer une adresse email valide." });
      return false;
    }
    if (password.length < 8) {
      setMessage({ type: "error", text: "Le mot de passe doit contenir au moins 8 caractères." });
      return false;
    }
    const matriculeRegex = /^[A-Za-z0-9]{10}$/;
    if (!matriculeRegex.test(entrepriseMatricule)) {
      setMessage({ type: "error", text: "Le matricule doit contenir exactement 10 caractères alphanumériques." });
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
  
    if (!validateForm()) {
      return;
    }
  
    try {
      const response = await registerRecruiter(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        {
          nom: formData.entrepriseName,
          matricule: formData.entrepriseMatricule,
          adresse: formData.entrepriseAdresse,
          telephone: formData.entrepriseTelephone,
          secteur: formData.entrepriseSecteur,
        }
      );
  
      console.log("Réponse du backend:", response);
  
      const userInfo = decodeToken(response.token);
      console.log(userInfo); // Vérifie la structure du token
      
      // Mets à jour le contexte avec les données de l'utilisateur
      setUser(userInfo);
      
      // Vérifie si le rôle est correct
      if (userInfo && userInfo.role === "recruteur") {
        navigate("/HomeRecruiter");
      } else {
        setMessage({ type: "error", text: "Erreur lors de la connexion" });
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription du recruteur:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Une erreur est survenue, veuillez réessayer.",
      });
    }
  };
  
  const inputFields = [
    { label: "Prénom", name: "firstName" },
    { label: "Nom", name: "lastName" },
    { label: "Email", name: "email", type: "email" },
    { label: "Mot de passe", name: "password", type: "password" },
    { label: "Nom de l'entreprise", name: "entrepriseName" },
    { label: "Matricule de l'entreprise", name: "entrepriseMatricule" },
    { label: "Adresse de l'entreprise", name: "entrepriseAdresse" },
    { label: "Téléphone de l'entreprise", name: "entrepriseTelephone" },
    { label: "Secteur d'activité", name: "entrepriseSecteur" },
  ];

  const isFormValid = Object.values(formData).every((field) => field.trim() !== "");

  return (
    <div className="register-form">
      <h2>Inscription Recruteur</h2>
      <form onSubmit={handleSubmit}>
        {inputFields.map(({ label, name, type = "text" }) => (
          <div className="input-gr" key={name}>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        {message.text && <p className={`message ${message.type}`}>{message.text}</p>}

        <button className="submit-button-reg" type="submit" disabled={!isFormValid}>
          Créer mon compte
        </button>
      </form>

      <div className="container">
        <span className="text">----- Vous avez déjà un compte ? -----</span>
      </div>

      <Link to="/login">
        <button className="sign-up-Button">Se connecter</button>
      </Link>
    </div>
  );
};

export default RegisterRecruiter;