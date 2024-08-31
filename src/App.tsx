import { lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoodPage = lazy(() => import("./pages/MoodPage/MoodPage"));

const App = () => {
  return (
    <>
      <HomePage />
      <MoodPage />
    </>
  );
};

export default App;
