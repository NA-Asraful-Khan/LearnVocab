import { useDispatch, useSelector } from "react-redux";
import { logout, useCurrentToken } from "../../redux/features/auth/auth.slice";
import { verifyToken } from "../../utils/verifyToken";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = useSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useDispatch();

  if (role !== undefined && role !== user?.role) {
    if (user?.role !== "super-admin") {
      dispatch(logout());
      return <Navigate to={`/login`} replace={true} />;
    }
  }
  if (!token) {
    return <Navigate to={`/login`} replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
