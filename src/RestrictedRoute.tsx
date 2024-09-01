import { Navigate } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { selectIsLoggedIn } from "./redux/auth/selectors";
import { RouteProps } from "./PrivateRoute";

const RestrictedRoute: React.FC<RouteProps> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};

export default RestrictedRoute;
