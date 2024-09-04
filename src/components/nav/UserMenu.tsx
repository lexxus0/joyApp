import { Menu } from "@headlessui/react";
import { UserIcon, CogIcon, LogoutIcon } from "@heroicons/react/solid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutUser } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { selectProfilePic } from "../../redux/auth/selectors";
import def from "../../img/def.jpg";

const UserMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profilePic = useAppSelector(selectProfilePic) || def;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="relative inline-block text-left">
      <Menu>
        <Menu.Button className="flex items-center justify-center w-20 h-18 bg-transparent text-white">
          <img
            src={profilePic}
            alt="User Avatar"
            className="ml-2 w-14 h-14 rounded-full object-cover"
          />
        </Menu.Button>

        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-gray-800 border border-gray-700 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex items-center w-full px-4 py-2 text-sm ${
                    active ? "bg-gray-700 text-white" : "text-gray-300"
                  }`}
                  onClick={() => navigate("/profile")}
                >
                  <UserIcon className="w-5 h-5 mr-3" />
                  Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex items-center w-full px-4 py-2 text-sm ${
                    active ? "bg-gray-700 text-white" : "text-gray-300"
                  }`}
                  onClick={() => navigate("/settings")}
                >
                  <CogIcon className="w-5 h-5 mr-3" />
                  Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex items-center w-full px-4 py-2 text-sm ${
                    active ? "bg-gray-700 text-white" : "text-gray-300"
                  }`}
                  onClick={handleLogout}
                >
                  <LogoutIcon className="w-5 h-5 mr-3" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default UserMenu;
