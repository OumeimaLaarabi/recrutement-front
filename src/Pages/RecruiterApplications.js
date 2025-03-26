import { useEffect, useState } from "react";
import { updateCandidatureStatus, fetchCandidatures } from "../Services/CandidatureService";
import "./RecruiterApplications.css";

const RecruiterApplications = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    const loadCandidatures = async () => {
      try {
        const data = await fetchCandidatures();
        setCandidatures(data);
      } catch (error) {
        console.error("Erreur lors du chargement des candidatures :", error);
      }
    };

    getUser();
    loadCandidatures();
  }, []);

  const formatScoreAsPercentage = (score) => {
    if (score !== undefined && score !== null) {
      return `${score}%`;
    }
    return "N/A";
  };

  const isRecruteurOrAdmin = user && (user.role === "recruteur" || user.role === "admin");

  const handleStatusChange = async (id, newStatus, offerId, talentId) => {
    try {
      await updateCandidatureStatus(id, newStatus, offerId, talentId);
      setCandidatures((prev) =>
        prev.map((c) => (c._id === id ? { ...c, statuts: newStatus } : c))
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Liste des Candidatures</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Offre</th> {/* New column for offer title */}
            <th className="border p-2">Nom du Candidat</th>
            <th className="border p-2">CV</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Date de Candidature</th>
            <th className="border p-2">Statut</th>
            {isRecruteurOrAdmin && <th className="border p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {candidatures.map((c) => (
            <tr key={c._id} className="border">
              <td className="border p-2">{c.offre?.title || "N/A"}</td> {/* Offer title */}
              <td className="border p-2">{c.candidat?.nom || "N/A"}</td>
              <td className="border p-2">
                <a href={c.cv} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  Voir CV
                </a>
              </td>
              <td className="border p-2">{formatScoreAsPercentage(c.score)}</td>
              <td className="border p-2">{new Date(c.date_de_candidature).toLocaleDateString()}</td>
              <td className="border p-2">{c.statuts}</td>
              {isRecruteurOrAdmin && (
                <td className="border p-2">
                  <select
                    value={c.statuts}
                    onChange={(e) => handleStatusChange(c._id, e.target.value, c.offre?._id, c.candidat?._id)}
                    className="p-1 border rounded"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="REFUSED">REFUSED</option>
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecruiterApplications;