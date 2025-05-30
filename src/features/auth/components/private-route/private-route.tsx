import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.isAuthenticated) {
    return <Navigate to="/login" replace />;
    alert("Please login first")
  }
  return <>{children}</>;
};

export default PrivateRoute;
