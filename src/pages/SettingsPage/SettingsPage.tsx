import React, { useState, useEffect } from "react";
import { logoutUser } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import { changeLang, Lang } from "../../redux/lang/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { db } from "../../firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  //   const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [theme, setTheme] = useState<string>(
    () => localStorage.getItem("theme") || "light"
  );
  const [language, setLanguage] = useState<Lang>(
    () => (localStorage.getItem("lang") as Lang) || "en"
  );
  const [notifications, setNotifications] = useState<boolean>(true);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setProfilePic(localStorage.getItem(`${user}_profilePic`) || "");
    }
  }, [user]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.target.value;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLang = event.target.value as Lang;
    setLanguage(newLang);
    dispatch(changeLang(newLang));
    localStorage.setItem("lang", newLang);
  };

  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      alert("Account deleted");
    }
  };

  const handleProfilePicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfilePic = reader.result as string;
        setProfilePic(newProfilePic);
        localStorage.setItem(`${user}_profilePic`, newProfilePic);

        if (user) {
          const userDoc = doc(collection(db, "users"), user);
          updateDoc(userDoc, { profilePic: newProfilePic });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Settings
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Personal Information
        </h3>
        <div className="flex items-center space-x-4">
          <div className="relative w-24 h-24">
            <img
              src={profilePic || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-full h-full rounded-full border border-gray-300 object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div>
            <p className="text-gray-600">Email: {user}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Account Settings
        </h3>
        <button className="w-full bg-yellow-500 text-white py-2 rounded mb-2 hover:bg-yellow-600 transition duration-300">
          Change Password
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Interface Settings
        </h3>
        <div className="flex items-center justify-between mb-4">
          <label className="text-gray-600">Theme</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === "light"}
                onChange={handleThemeChange}
                className="form-radio"
              />
              <span className="ml-2">Light</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === "dark"}
                onChange={handleThemeChange}
                className="form-radio"
              />
              <span className="ml-2">Dark</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <label className="text-gray-600">Language</label>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="en">English</option>
            <option value="ua">Українська</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-gray-600">Notifications</label>
          <button
            onClick={handleNotificationsToggle}
            className={`w-12 h-6 flex items-center rounded-full p-1 ${
              notifications ? "bg-green-400" : "bg-gray-300"
            } transition duration-300`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                notifications ? "translate-x-6" : ""
              } transition duration-300`}
            ></div>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Additional Settings
        </h3>
        <button
          onClick={handleDeleteAccount}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-300"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
