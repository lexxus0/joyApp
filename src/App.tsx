import { lazy, useEffect, useCallback } from "react";
import { Theme, setTheme } from "./redux/theme/slice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./redux/hooks";
import { checkUserAuth } from "./redux/auth/operations";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";
import Layout from "./components/nav/Layout";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoodPage = lazy(() => import("./pages/MoodPage"));
const MoodForm = lazy(() => import("./components/mood/MoodForm"));
const MoodList = lazy(() => import("./components/mood/MoodList"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const NoteDetailsPage = lazy(() => import("./pages/NoteDetailsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const StatsPage = lazy(() => import("./pages/StatsPage"));

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const applyTheme = useCallback(
    (theme: Theme) => {
      document.body.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      dispatch(setTheme(theme));
    },
    [dispatch]
  );

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "dark";
    applyTheme(savedTheme);
  }, [applyTheme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        const savedTheme = localStorage.getItem("theme") as Theme;
        applyTheme(savedTheme);
      }
    });
    return () => unsubscribe();
  }, [applyTheme]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
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
          element={<RestrictedRoute redirectTo="/mood" component={LoginPage} />}
        />
        <Route
          path="/mood"
          element={<PrivateRoute redirectTo="/mood" component={MoodPage} />}
        />
        <Route
          path="/mood/form"
          element={<PrivateRoute redirectTo="/login" component={MoodForm} />}
        />
        <Route
          path="/mood/list"
          element={<PrivateRoute redirectTo="/login" component={MoodList} />}
        />
        <Route
          path="/mood/stats"
          element={<PrivateRoute redirectTo="/login" component={StatsPage} />}
        />
        <Route path="/mood/:noteId" element={<NoteDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
