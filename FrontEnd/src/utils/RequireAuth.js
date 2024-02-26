import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  ); //will revert back to the page from where it came into current page on clicking on back
  //  above is ternary statement that render children of the Require auth if  auth?.user is not false/null
};

export default RequireAuth;
