import { lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./redux/hooks";
import { checkUserAuth } from "./redux/auth/operations";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";
import Layout from "./components/nav/Layout";
import Dashboard from "./pages/StatsPage";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { setTheme, Theme } from "./redux/theme/slice";
import { changeLang } from "./redux/lang/slice";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoodPage = lazy(() => import("./pages/MoodPage"));
const MoodForm = lazy(() => import("./components/mood/MoodForm"));
const MoodList = lazy(() => import("./components/mood/MoodList"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const NotFoundPage = lazy(() => import("./pages//NotFoundPage"));
const NoteDetailsPage = lazy(() => import("./pages/NoteDetailsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          if (userData.theme) {
            const userTheme: Theme = userData.theme;
            document.body.setAttribute("data-theme", userTheme);
            dispatch(setTheme(userTheme));
          }

          if (userData.language) {
            dispatch(changeLang(userData.language));
          }
        }
      }
      setIsLoaded(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute redirectTo="/mood" component={RegisterPage} />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute redirectTo="/mood" component={LoginPage} />
              }
            />
            <Route
              path="/mood"
              element={<PrivateRoute redirectTo="/mood" component={MoodPage} />}
            />
            <Route
              path="/mood/form"
              element={
                <PrivateRoute redirectTo="/login" component={MoodForm} />
              }
            />
            <Route
              path="/mood/list"
              element={
                <PrivateRoute redirectTo="/login" component={MoodList} />
              }
            />
            <Route
              path="/mood/stats"
              element={
                <PrivateRoute redirectTo="/login" component={Dashboard} />
              }
            />
            <Route path="/mood/:noteId" element={<NoteDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default App;
