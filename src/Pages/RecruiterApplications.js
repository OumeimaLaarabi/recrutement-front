import { useEffect, useState } from "react";
import { getApplicationsByRecruiter, updateCandidatureStatus, deleteCandidatureById } from "../Services/CandidatureService"; 
import "./RecruiterApplications.css";
import { Trash2 } from "lucide-react"; // Import trash icon

const RecruiterApplications = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    getUser();
  }, []);

  useEffect(() => {
    if (user && user.id) {
      const fetchCandidatures = async () => {
        try {
          const data = await getApplicationsByRecruiter(user.id);
          console.log("Fetched Candidatures:", data);

          setCandidatures(data.candidatures);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchCandidatures();
    }
  }, [user]);

  const formatScoreAsPercentage = (score) => {
    return score !== undefined && score !== null ? `${score}%` : "N/A";
  };

  const isRecruteurOrAdmin = user && (user.role === "recruteur" || user.role === "admin");

  const handleStatusChange = async (id, newStatus, offerId, talentId) => {
    if (!offerId || !talentId) {
      console.error("❌ offerId ou talentId est manquant", { id, newStatus, offerId, talentId });
      return;
    }
    try {
      await updateCandidatureStatus(id, newStatus, offerId, talentId);
      
      setCandidatures((prev) =>
        prev.map((c) => (c._id === id ? { ...c, statuts: newStatus } : c))
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;

    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette candidature ?")) {
      try {
        await deleteCandidatureById(id);
        setCandidatures((prev) => prev.filter((c) => c._id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression de la candidature :", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Liste des Candidatures</h2>
      
      {/* Message sur le nombre de candidatures */}
      {candidatures.length > 0 ? (
        <p className="text-green-500 font-semibold">
          Vous avez {candidatures.length} candidature(s).
        </p>
      ) : (
        <p className="text-red-500 font-semibold">Vous n'avez aucune candidature.</p>
      )}

      {error && <div className="text-red-500">{error}</div>}

      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Offre</th>
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
              <td className="border p-2">{c.offreTitle || "N/A"}</td>
              <td className="border p-2">{c.candidatName || "N/A"}</td>
              <td className="border p-2">
              <a href={c.cv} download className="text-blue-500 underline">
              Voir CV
                </a>
              </td>
              <td className="border p-2">{formatScoreAsPercentage(c.score)}</td>
              <td className="border p-2">{new Date(c.date_de_candidature).toLocaleDateString()}</td>
              <td className="border p-2">{c.statuts}</td>
              
              {isRecruteurOrAdmin && (
                <td className="border p-2 flex gap-2">
                  <select
                    value={c.statuts}
                    onChange={(e) => handleStatusChange(c._id, e.target.value, c.offerId, c.talentId)}
                    className="p-1 border rounded"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="REFUSED">REFUSED</option>
                  </select>
                  
                  <td className="border p-2 flex justify-center items-center">
                <Trash2
                  size={22} 
                  color="red" 
                  className="cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={() => handleDelete(c._id)}
                />
              </td>
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
