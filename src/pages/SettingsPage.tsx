import { useEffect, useState } from "react";
import { logoutUser } from "../redux/auth/operations";
import { updatePassword, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Switch } from "@headlessui/react";
import { TrashIcon, LockClosedIcon } from "@heroicons/react/solid";
import { changeLang, Lang } from "../redux/lang/slice";
import { setTheme } from "../redux/theme/slice";
import { auth } from "../firebase";
import { Helmet } from "react-helmet-async";
import { selectLanguage, useTranslation } from "../redux/lang/selectors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectTheme } from "../redux/theme/selectors";

const SettingsPage: React.FC = () => {
  const languages: { id: Lang; name: string }[] = [
    { id: "en", name: "English" },
    { id: "uk", name: "Ukrainian" },
    { id: "es", name: "Spanish" },
  ];
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const selectedTheme = useAppSelector(selectTheme);
  const selectedLanguage = useAppSelector(selectLanguage);

  useEffect(() => {
    if (selectedTheme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else if (selectedTheme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [selectedTheme]);

  const handleThemeToggle = (checked: boolean) => {
    const newTheme = checked ? "light" : "dark";
    dispatch(setTheme(newTheme)); 
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLang = event.target.value as Lang;
    dispatch(changeLang(selectedLang));
  };

  const handlePasswordChange = async () => {
    if (auth.currentUser && newPassword) {
      try {
        await updatePassword(auth.currentUser, newPassword);
        setNewPassword("");
        toast.success("Password updated successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update password");
      }
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (user) {
      if (!deleteConfirmed) {
        toast.warning(
          "Are you sure? Press the delete button again to confirm."
        );
        setDeleteConfirmed(true);
        return;
      }

      try {
        await deleteUser(user);
        dispatch(logoutUser());
        navigate("/");
        toast.success("Account deleted successfully.");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        toast.error("Failed to delete account.");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Settings" />
      </Helmet>
      <div
        className={`mt-40 mb-20 max-w-4xl mx-auto p-8 shadow-md rounded-lg ${
          selectedTheme === "dark"
            ? "bg-gray-800 text-gray-100"
            : "bg-white text-gray-900"
        }`}
      >
        <ToastContainer
          autoClose={2500}
          theme={selectedTheme === "dark" ? "dark" : "light"}
        />
        <h2 className="text-4xl font-bold text-center mb-8">
          {t("settingsTitle")}
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <LockClosedIcon className="w-6 h-6 mr-2 text-blue-500" />
              {t("changePassword")}
            </h3>
            <div className="flex flex-col space-y-4">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t("enterNewPassword")}
                className={`p-3 border rounded focus:outline-none focus:border-blue-500 ${
                  selectedTheme === "dark"
                    ? "border-gray-700 bg-gray-800 text-gray-100"
                    : "border-gray-300 bg-white text-gray-900"
                }`}
              />
              <button
                onClick={handlePasswordChange}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                {t("updatePassword")}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <TrashIcon className="w-6 h-6 mr-2 text-red-500" />
              {t("deleteAccount")}
            </h3>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
            >
              {t("deleteAccount")}
            </button>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4"> {t("switchTheme")}</h3>
            <Switch.Group>
              <div className="flex items-center">
                <Switch.Label className="mr-4">
                  {selectedTheme === "dark" ? t("darkMode") : t("lightMode")}
                </Switch.Label>
                <Switch
                  checked={selectedTheme === "light"}
                  onChange={handleThemeToggle}
                  className={`${
                    selectedTheme === "dark" ? "bg-blue-600" : "bg-gray-700"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition duration-200`}
                >
                  <span
                    className={`${
                      selectedTheme === "dark"
                        ? "translate-x-6"
                        : "translate-x-1"
                    } inline-block h-4 w-4 transform bg-white rounded-full transition duration-200`}
                  />
                </Switch>
              </div>
            </Switch.Group>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              {t("changeLanguage")}
            </h3>
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className={`block w-full p-2.5 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                selectedTheme === "dark"
                  ? "bg-gray-800 border-gray-700 text-gray-100"
                  : "bg-white border-slate-600 text-gray-900"
              }`}
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
