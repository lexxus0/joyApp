import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectIsLoggedIn } from "../../../redux/auth/selectors";
import clsx from "clsx";

const Navigation = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <nav className="flex space-x-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          clsx(
            "text-gray-700 hover:text-blue-500 font-medium",
            isActive && "text-blue-500"
          )
        }
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/mood"
          className={({ isActive }) =>
            clsx(
              "text-gray-700 hover:text-blue-500 font-medium",
              isActive && "text-blue-500"
            )
          }
        >
          Mood
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
