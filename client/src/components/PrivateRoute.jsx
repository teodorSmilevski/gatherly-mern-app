import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const PrivateRoute = ({ children, roles, onlyNotAuth }) => {
  const { isAuth, user } = useAuth();

  console.log(isAuth, user);

  if (onlyNotAuth) {
    if (isAuth) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0) {
    if (!user || !roles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default PrivateRoute;
