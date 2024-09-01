import { Navigate } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { selectIsLoggedIn } from "./redux/auth/selectors";

export interface RouteProps {
  component: React.ComponentType;
  redirectTo?: string;
}

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Component /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
