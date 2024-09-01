import { NavLink } from "react-router-dom";
import clsx from "clsx";

const AuthNav = () => {
  return (
    <div className="flex space-x-4">
      <NavLink
        to="/register"
        className={({ isActive }) =>
          clsx(
            "text-gray-700 hover:text-blue-500 font-medium",
            isActive && "text-blue-500"
          )
        }
      >
        Register
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          clsx(
            "text-gray-700 hover:text-blue-500 font-medium",
            isActive && "text-blue-500"
          )
        }
      >
        Login
      </NavLink>
    </div>
  );
};
export default AuthNav;
