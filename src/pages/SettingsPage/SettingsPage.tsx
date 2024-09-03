import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { logoutUser } from "../../redux/auth/operations";
import { deleteUser, updatePassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Switch } from "@headlessui/react";
import { TrashIcon, LockClosedIcon } from "@heroicons/react/solid";
import { changeLang, Lang } from "../../redux/lang/slice";
import { useTranslation } from "../../redux/lang/slice";
import { setTheme, Theme } from "../../redux/theme/slice";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const languages: { id: Lang; name: string }[] = [
    { id: "en", name: "English" },
    { id: "uk", name: "Ukrainian" },
  ];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<Theme>("light");
  const [selectedLanguage, setSelectedLanguage] = useState<Lang>("en");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.theme) {
            setSelectedTheme(userData.theme);
            document.body.setAttribute("data-theme", userData.theme);
            dispatch(setTheme(userData.theme));
          }
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
      dispatch(setTheme(selectedTheme));
      if (auth.currentUser) {
        updateUserSettings("theme", selectedTheme);
      }
    }
  }, [selectedTheme, dispatch, isLoaded]);

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

  const handleThemeToggle = (checked: boolean) => {
    const theme = checked ? "dark" : "light";
    setSelectedTheme(theme);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLang = event.target.value as Lang;
    setSelectedLanguage(selectedLang);
    dispatch(changeLang(selectedLang));
    if (auth.currentUser) {
      updateUserSettings("language", selectedLang);
    }
  };

  const updateUserSettings = async (key: string, value: string) => {
    if (auth.currentUser) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      try {
        await updateDoc(userDocRef, {
          [key]: value,
        });
        console.log(`User ${key} updated successfully`);
      } catch (error) {
        console.error(`Error updating user ${key}:`, error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg mt-6">
      <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
        {t("settings")}
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
            <LockClosedIcon className="w-6 h-6 mr-2 text-blue-600" />
            Change Password
          </h3>
          <div className="flex flex-col space-y-4">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="p-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handlePasswordChange}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Update Password
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
            <TrashIcon className="w-6 h-6 mr-2 text-red-600" />
            Delete Account
          </h3>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
          >
            Delete Account
          </button>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
            Switch Theme
          </h3>
          <Switch.Group>
            <div className="flex items-center">
              <Switch.Label className="mr-4 text-gray-700 dark:text-gray-200">
                Dark Mode
              </Switch.Label>
              <Switch
                checked={selectedTheme === "dark"}
                onChange={handleThemeToggle}
                className={`${
                  selectedTheme === "dark" ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full transition duration-200`}
              >
                <span
                  className={`${
                    selectedTheme === "dark" ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform bg-white rounded-full transition duration-200`}
                />
              </Switch>
            </div>
          </Switch.Group>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
            Change Language
          </h3>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="block w-full p-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
  );
};

export default SettingsPage;
