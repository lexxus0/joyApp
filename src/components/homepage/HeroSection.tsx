import heroImage from "../../img/heroimg.jpg";
import { useTranslation } from "../../redux/lang/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useAppSelector } from "../../redux/hooks";

const HeroSection: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { t } = useTranslation();
  return (
    <section
      className="relative flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">{t("heroTitle")}</h1>
        <p className="text-lg mb-8">{t("heroDescription")}</p>
        <a
          href={isLoggedIn ? "/mood" : "/register"}
          className="bg-blue-800 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {t("heroButton")}
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
