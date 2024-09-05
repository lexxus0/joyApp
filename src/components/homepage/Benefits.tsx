import { useTranslation } from "../../redux/lang/selectors";
import { useAppSelector } from "../../redux/hooks";
import { selectTheme } from "../../redux/theme/selectors";

const BenefitsSection: React.FC = () => {
  const { t } = useTranslation();
  const selectedTheme = useAppSelector(selectTheme);

  const benefits = [
    {
      title: t("title1"),
      description: t("description1"),
      icon: "📊",
    },
    {
      title: t("title2"),
      description: t("description2"),
      icon: "🔍",
    },
    {
      title: t("title3"),
      description: t("description3"),
      icon: "💡",
    },
    {
      title: t("title4"),
      description: t("description4"),
      icon: "🧘",
    },
  ];

  return (
    <section className={`py-12 px-6 `}>
      <h2
        className={`text-4xl font-bold text-center mb-8 ${
          selectedTheme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        {t("why")}
      </h2>
      <div
        className={`w-84 mx-auto h-1 rounded-full mb-8 ${
          selectedTheme === "dark"
            ? "bg-gradient-to-r from-blue-400 to-blue-600"
            : "bg-gradient-to-r from-pink-400 to-yellow-600"
        }`}
      ></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className={`p-8 border text-left transition-transform transform hover:-translate-y-2 hover:scale-105 duration-300 ease-in-out ${
              selectedTheme === "dark"
                ? "bg-gray-800 border-gray-700 hover:border-red-500"
                : "bg-gray-200 border-gray-300 hover:border-blue-500"
            }`}
            style={{ borderRadius: "0px" }}
          >
            <div className="flex items-center mb-4">
              <div
                className={`p-4 rounded-full ${
                  selectedTheme === "dark" ? "bg-red-500" : "bg-blue-500"
                }`}
              >
                <span className="text-3xl text-white">{benefit.icon}</span>
              </div>
            </div>
            <h3
              className={`text-2xl font-semibold mb-2 ${
                selectedTheme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {benefit.title}
            </h3>
            <p
              className={`${
                selectedTheme === "dark" ? "text-gray-400" : "text-gray-700"
              }`}
            >
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
