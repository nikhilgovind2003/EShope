import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
