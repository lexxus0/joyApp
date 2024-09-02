import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { RootState } from "../../redux/store";
// import { translations } from "../../redux/lang/translations";
import { changeLang } from "../../redux/lang/slice";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  // const lang = useAppSelector((state: RootState) => state.lang.language) as
  // | "en"
  // | "uk";
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const handleLanguageChange = (lang: "en" | "uk") => {
    dispatch(changeLang(lang));
  };

  // const t = translations[lang];

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-4"></h1>
        <p className="text-lg text-gray-700 text-center mb-6"></p>
        <a
          href={isLoggedIn ? "/mood" : "/login"}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg text-center font-medium transition-colors duration-300 hover:bg-blue-700"
        >
          {isLoggedIn ? "View Your Notes" : "Login to View Notes"}
        </a>
      </div>
      <div className="mt-4">
        <button
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded mr-2"
          onClick={() => handleLanguageChange("en")}
        >
          English
        </button>
        <button
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
          onClick={() => handleLanguageChange("uk")}
        >
          Українська
        </button>
      </div>
    </>
  );
};

export default HomePage;
