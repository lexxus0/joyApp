import { useAppSelector } from "../../redux/hooks";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useTranslation } from "../../redux/lang/slice";
import QuoteSection from "../../components/Quote/Quote";
import MoodStats from "../../components/mood/MoodStats/MoodStats";

const HomePage: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          {t("welcome")}
        </h1>
        <p className="text-lg text-gray-700 text-center mb-6">
          {t("description")}
        </p>
        <a
          href={isLoggedIn ? "/mood" : "/login"}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg text-center font-medium transition-colors duration-300 hover:bg-blue-700"
        >
          {isLoggedIn ? "View Your Notes" : "Login to View Notes"}
          {isLoggedIn && <MoodStats />}
        </a>
        <QuoteSection />
      </div>
      <div className="mt-4"></div>
    </>
  );
};

export default HomePage;
