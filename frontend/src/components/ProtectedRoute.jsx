import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminLoggedIn') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/adminlogin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
