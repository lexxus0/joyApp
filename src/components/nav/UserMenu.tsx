import { useState } from "react";
import { UserIcon, CogIcon, LogoutIcon } from "@heroicons/react/solid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutUser } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { selectProfilePic } from "../../redux/auth/selectors";
import def from "../../img/def.jpg";
import { useTranslation } from "../../redux/lang/selectors";
import { GiAchievement } from "react-icons/gi";

const UserMenu: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profilePic = useAppSelector(selectProfilePic) || def;

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center justify-center w-20 h-18 bg-transparent text-white"
      >
        <img
          src={profilePic}
          alt="User Avatar"
          className="ml-2 w-14 h-14 rounded-full object-cover"
        />
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
          <div className="p-1">
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
            >
              <UserIcon className="w-5 h-5 mr-3" />
              {t("profile")}
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => {
                navigate("/settings");
                setMenuOpen(false);
              }}
            >
              <CogIcon className="w-5 h-5 mr-3" />
              {t("settings")}
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => {
                navigate("/achievements");
                setMenuOpen(false);
              }}
            >
              <GiAchievement className="w-5 h-5 mr-3" />
              {t("achievements")}
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              <LogoutIcon className="w-5 h-5 mr-3" />
              {t("logout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
