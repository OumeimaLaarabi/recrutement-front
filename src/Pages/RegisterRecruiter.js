import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterRecruiter.css";
import { registerRecruiter } from "../Services/UserServices";
import { useUserContext } from "../Contexts/AuthContext";

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

  const [logo, setLogo] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]); // Stocke le fichier logo sélectionné
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
    if (!logo) {
      setMessage({ type: "error", text: "Veuillez télécharger un logo d'entreprise." });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

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
        },
        logo // Ajout du fichier logo
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

  const isFormValid = Object.values(formData).every((field) => field.trim() !== "") && logo;

  return (
    <div className="register-forme">
      <h2>Inscription Recruteur</h2>
      <form onSubmit={handleSubmit}>
        {inputFields.map(({ label, name, type = "text" }) => (
          <div className="input-group" key={name}>
            <label>{label}</label>
            <input type={type} name={name} value={formData[name]} onChange={handleChange} required />
          </div>
        ))}

        {/* Champ pour le logo */}
        <div className="input-group">
          <label>Logo de l'entreprise</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </div>

        {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
        <button className="submit-button" type="submit" disabled={!isFormValid}>
          Créer mon compte
        </button>
      </form>
      <p className="login-text">
        Déjà un compte ? <Link to="/login" className="login-link">Se connecter</Link>
      </p>
    </div>
  );
};

export default RegisterRecruiter;
