import { FaUserAlt, FaChartLine, FaSmile } from "react-icons/fa";
import { useTranslation } from "../../redux/lang/selectors";
import { useAppSelector } from "../../redux/hooks";
import { selectTheme } from "../../redux/theme/selectors";

const HowItWorksSection: React.FC = () => {
  const { t } = useTranslation();
  const selectedTheme = useAppSelector(selectTheme);

  return (
    <section
      className={`${
        selectedTheme === "dark" ? "text-gray-100" : "text-gray-800"
      }`}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10">{t("howItWorksTitle")}</h2>
        <div
          className={`w-84 mx-auto h-1 rounded-full ${
            selectedTheme === "dark"
              ? "bg-gradient-to-r from-blue-400 to-blue-600"
              : "bg-gradient-to-r from-pink-400 to-yellow-600"
          }`}
        ></div>

        <div className="flex flex-wrap justify-center gap-6 pt-12">
          <div className="w-full sm:w-1/3 p-4 flex justify-center">
            <div
              className={`rounded-lg p-8 shadow-lg flex flex-col justify-between items-center h-full w-80 transition-transform transform hover:scale-105 ${
                selectedTheme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-200 hover:bg-gray-100"
              }`}
            >
              <FaUserAlt
                className={`text-5xl mb-4 ${
                  selectedTheme === "dark" ? "text-blue-500" : "text-pink-500"
                }`}
              />
              <h3 className="text-2xl font-semibold mb-4">{t("step1Title")}</h3>
              <p className="text-lg">{t("step1Description")}.</p>
            </div>
          </div>
          <div className="w-full sm:w-1/3 p-4 flex justify-center">
            <div
              className={`rounded-lg p-8 shadow-lg flex flex-col justify-between items-center h-full w-80 transition-transform transform hover:scale-105 ${
                selectedTheme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-200 hover:bg-gray-100"
              }`}
            >
              <FaChartLine
                className={`text-5xl mb-4 ${
                  selectedTheme === "dark" ? "text-blue-500" : "text-pink-500"
                }`}
              />
              <h3 className="text-2xl font-semibold mb-4">{t("step2Title")}</h3>
              <p className="text-lg">{t("step2Description")}</p>
            </div>
          </div>
          <div className="w-full sm:w-1/3 p-4 flex justify-center">
            <div
              className={`rounded-lg p-8 shadow-lg flex flex-col justify-between items-center h-full w-80 transition-transform transform hover:scale-105 ${
                selectedTheme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-200 hover:bg-gray-100"
              }`}
            >
              <FaSmile
                className={`text-5xl mb-4 ${
                  selectedTheme === "dark" ? "text-blue-500" : "text-pink-500"
                }`}
              />
              <h3 className="text-2xl font-semibold mb-4">{t("step3Title")}</h3>
              <p className="text-lg">{t("step3Description")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
