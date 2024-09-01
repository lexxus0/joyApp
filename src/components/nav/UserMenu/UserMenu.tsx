import { useAppDispatch } from "../../../redux/hooks";
import { logoutUser } from "../../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

const UserMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 font-semibold"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
