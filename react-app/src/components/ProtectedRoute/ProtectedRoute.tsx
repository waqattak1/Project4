import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ element: Component }: { element: React.ReactElement }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? Component : <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoute;
