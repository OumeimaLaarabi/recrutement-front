import { Navigate } from "react-router-dom";
import { useUserContext } from "../Contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();

  if (!user || !user.isRecruteur) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;