import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAllow, redirect = '/' }) => {
  return isAllow ? <Outlet /> : <Navigate to={redirect} replace />;
};

export default ProtectedRoute;