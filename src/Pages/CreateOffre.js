import React, { useState } from "react";
import { createOffre } from "../Services/offreService";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Contexts/AuthContext";
import {
  Input,
  Button,
  Select,
  DatePicker,
  Typography,
  Space,
  Divider,
  message,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "./CreateOffer.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Style de l'éditeur
const { TextArea } = Input;
const { Title } = Typography;

const CreateOffre = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateExpiration, setDateExpiration] = useState(null);
  const [adresse, setAdresse] = useState("");
  const [typeOffre, setTypeOffre] = useState("CDI");
  const [domaine, setDomaine] = useState("");
  const [salaire, setSalaire] = useState("");
  const [motsCle, setMotsCle] = useState([]);
  const [langues, setLangues] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  
  const handleArrayInput = (e, setter) => {
    const values = e.target.value
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val !== "");
    setter(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      message.error("Erreur: Impossible de récupérer l'ID du recruteur.");
      return;
    }

    try {
      const offreData = {
        title,
        description,
        date_expiration: dateExpiration?.format("YYYY-MM-DD"),
        adresse,
        type_offre: typeOffre,
        domaine,
        salaire,
        mots_cle: motsCle,
        langues,
        id_recruteur: user.id,
      };

      await createOffre(offreData);
      message.success("Offre créée avec succès !");
      navigate("/HomeRecruiter");
    } catch (err) {
      message.error("Erreur lors de la création de l'offre.");
      console.error(err);
    }
  };

  return (
    <div className="form-horizontal-container">
      <h1>Créer une Nouvelle Offre</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="form-horizontal">
        <div className="form-field">
          <label>Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de l'offre"
            className="input-field"
          />
        </div>
        <div className="form-field">
          <label>Type</label>
          <select
            value={typeOffre}
            onChange={(e) => setTypeOffre(e.target.value)}
            className="input-field"
          >
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Stage">Stage</option>
          </select>
        </div>
        <div className="form-field">
          <label>Salaire</label>
          <input
            type="number"
            value={salaire}
            onChange={(e) => setSalaire(e.target.value)}
            placeholder="Salaire"
            className="input-field"
          />
        </div>
        <div className="form-field">
          <label>Adresse</label>
          <input
            type="text"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            placeholder="Adresse"
            className="input-field"
          />
        </div>
        <div className="form-field">
          <label>Domaine</label>
          <input
            type="text"
            value={domaine}
            onChange={(e) => setDomaine(e.target.value)}
            placeholder="Domaine"
            className="input-field"
          />
        </div>
        <div className="form-field">
  <label> Date Expiration</label>
  <DatePicker
    style={{ width: '100%' }}
    value={dateExpiration}
    onChange={(date) => setDateExpiration(date)}
    format="YYYY-MM-DD"
    placeholder="Choisissez une date"
  />
</div>
<div className="form-field">
    <label>Compétences </label>
    <input
      type="text"
      value={motsCle.join(", ")}
      onChange={(e) => handleArrayInput(e, setMotsCle)}
      placeholder="ex: JavaScript, React, Node.js"
      className="input-field"
    />
  </div>

  <div className="form-field">
    <label>Langues</label>
    <input
      type="text"
      value={langues.join(", ")}
      onChange={(e) => handleArrayInput(e, setLangues)}
      placeholder="ex: Français, Anglais"
      className="input-field"
    />
  </div>

{/* Description Field with Modern Styling */}
<div className="form-field description-field">
  <label htmlFor="description">Description de l'offre</label>
  <textarea
    id="description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Décrivez l'offre ici..."
    style={{
      width: '100%',
      height: '200px',
      borderRadius: '8px',
      border: '1px solid #ced4da',
      padding: '12px',
      fontSize: '16px',
      resize: 'vertical',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      outline: 'none',
    }}
  />
</div>


        <button type="submit" className="submit-button">
          Créer
        </button>
      </form>
    </div>
  );
};

export default CreateOffre;
