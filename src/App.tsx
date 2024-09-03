import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./redux/hooks";
import { checkUserAuth } from "./redux/auth/operations";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";
import Layout from "./components/nav/Layout/Layout";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoodPage = lazy(() => import("./pages/MoodPage/MoodPage"));
const MoodForm = lazy(() => import("./components/mood/MoodForm"));
const MoodList = lazy(() => import("./components/mood/MoodList/MoodList"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const NoteDetailsPage = lazy(
  () => import("./pages/NoteDetailsPage/NoteDetailsPage")
);
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage/SettingsPage"));

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
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
            element={<PrivateRoute redirectTo="/login" component={MoodForm} />}
          />
          <Route
            path="/mood/list"
            element={<PrivateRoute redirectTo="/login" component={MoodList} />}
          />
          <Route path="/mood/:noteId" element={<NoteDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
