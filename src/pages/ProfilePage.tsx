import { useState, useEffect } from "react";
import { setUser } from "../redux/auth/slice";
import { logoutUser } from "../redux/auth/operations";
import { selectUser } from "../redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { getDoc } from "firebase/firestore";
import def from "../img/def.jpg";
import { selectTheme } from "../redux/theme/selectors";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "../redux/lang/selectors";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const selectedTheme = useAppSelector(selectTheme);

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [newDisplayName, setNewDisplayName] = useState<string>("");

  useEffect(() => {
    if (user) {
      const fetchProfilePic = async () => {
        try {
          const userDoc = doc(db, "users", user.uid);
          const userSnap = await getDoc(userDoc);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setProfilePic(userData.profilePic || "");
            setDisplayName(userData.displayName || "");
            setNewDisplayName(userData.displayName || "");
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchProfilePic();
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleProfilePicChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (user && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const storageRef = ref(storage, `profilePics/${user.uid}`);

      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setProfilePic(downloadURL);

        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { profilePic: downloadURL });

        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            profilePic: downloadURL,
          })
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDisplayNameChange = async () => {
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { displayName: newDisplayName });
        setDisplayName(newDisplayName);
        alert("Display name updated successfully");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Profile" />
      </Helmet>
      <div
        className={`mt-40 mb-20 max-w-4xl mx-auto p-8 rounded-lg ${
          selectedTheme === "dark" ? " text-gray-100" : " text-gray-900"
        }`}
      >
        <div className="max-w-5xl mx-auto p-8 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-6">
              <img
                src={profilePic || def}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-600 shadow-md"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <h2
              className={`text-3xl font-semibold mb-4 ${
                selectedTheme === "dark" ? "text-gray-100" : "text-black"
              }`}
            >
              {displayName || "User"}
            </h2>
            <p className="text-gray-400 mb-4">{user?.email}</p>
            <div className="flex flex-col items-center">
              <input
                type="text"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                placeholder="Enter display name"
                className={`p-2 border rounded mb-4 focus:outline-none focus:border-blue-400 ${
                  selectedTheme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-gray-200 border-gray-300 text-black"
                }`}
              />
              <button
                onClick={handleDisplayNameChange}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                {t("updateProfileName")}
              </button>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              {t("logout")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
