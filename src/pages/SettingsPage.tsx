import { useEffect, useState } from "react";
import { logoutUser } from "../redux/auth/operations";
import { updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { useAppDispatch } from "../redux/hooks";
import { Switch } from "@headlessui/react";
import { TrashIcon, LockClosedIcon } from "@heroicons/react/solid";
import { changeLang, Lang } from "../redux/lang/slice";
import { setTheme, Theme } from "../redux/theme/slice";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "../redux/lang/selectors";

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
  const [selectedTheme, setSelectedTheme] = useState<Theme>("dark");
  const [selectedLanguage, setSelectedLanguage] = useState<Lang>("en");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setSelectedTheme(savedTheme);
      document.head.setAttribute("data-theme", savedTheme);
      dispatch(setTheme(savedTheme));
    } else {
      localStorage.setItem("theme", "dark");
      setSelectedTheme("dark");
      document.body.setAttribute("data-theme", "dark");
      dispatch(setTheme("dark"));
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.language) {
            setSelectedLanguage(userData.language);
            dispatch(changeLang(userData.language));
          }
        }
      }
      setIsLoaded(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (isLoaded) {
      document.body.setAttribute("data-theme", selectedTheme);
      localStorage.setItem("theme", selectedTheme);
      dispatch(setTheme(selectedTheme));
    }
  }, [selectedTheme, dispatch, isLoaded]);

  useEffect(() => {
    if (isLoaded && auth.currentUser) {
      updateUserSettings("language", selectedLanguage);
    }
  }, [selectedLanguage, isLoaded]);

  const updateUserSettings = async (key: string, value: string) => {
    if (auth.currentUser) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      try {
        await updateDoc(userDocRef, {
          [key]: value,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleThemeToggle = (checked: boolean) => {
    const newTheme = checked ? "light" : "dark";
    setSelectedTheme(newTheme);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLang = event.target.value as Lang;
    setSelectedLanguage(selectedLang);
    dispatch(changeLang(selectedLang));
  };

  const handlePasswordChange = async () => {
    if (auth.currentUser && newPassword) {
      try {
        await updatePassword(auth.currentUser, newPassword);
        alert("Password updated successfully");
        setNewPassword("");
      } catch (error) {
        console.error("Error updating password:", error);
        alert("Failed to update password");
      }
    } else {
      alert("Please enter a new password");
    }
  };

  const handleDeleteAccount = async () => {
    if (auth.currentUser) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete your account?"
      );
      if (confirmDelete) {
        try {
          await deleteUser(auth.currentUser);
          dispatch(logoutUser());
          navigate("/");
          alert("Account deleted successfully");
        } catch (error) {
          console.error(error);
          alert("Failed to delete account.");
        }
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
        <h2 className="text-4xl font-bold text-center mb-8">
          {" "}
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
