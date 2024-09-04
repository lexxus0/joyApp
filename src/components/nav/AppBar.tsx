import { NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useAppSelector } from "../../redux/hooks";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import clsx from "clsx";
import { PiLegoSmileyLight } from "react-icons/pi";

const AppBar = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <header
      className="absolute top-4 left-1/2 transform -translate-x-1/2 w-[95%]  bg-darkBlue/70 py-4 px-8 flex justify-between items-center z-50 rounded-full shadow-lg"
      style={{
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="flex items-center space-x-8">
        <NavLink
          to="/"
          className="flex text-2xl font-bold text-blue-500 hover:text-blue-400 flex-nowrap mb-0.5"
        >
          Mood
          <PiLegoSmileyLight className="mt-1" />
          Tracker
        </NavLink>

        {isLoggedIn && (
          <NavLink
            to="/mood"
            className={({ isActive }) =>
              clsx(
                "text-xl font-semibold px-3 py-1 transition-colors duration-200",
                isActive
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-white hover:text-blue-300"
              )
            }
          >
            Mood
          </NavLink>
        )}
      </div>

      {isLoggedIn ? (
        <UserMenu />
      ) : (
        <div className="flex items-center space-x-4">
          <NavLink
            to="/login"
            className="text-white hover:text-blue-400 font-medium"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/register"
            className="text-white hover:text-blue-400 font-medium px-4 py-2 border border-gray-300 rounded-full"
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default AppBar;
