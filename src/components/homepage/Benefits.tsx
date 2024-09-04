import { useTranslation } from "../../redux/lang/slice";

const BenefitsSection: React.FC = () => {
  const { t } = useTranslation();

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
    <section className="bg-transparent py-12 px-6">
      <h2 className="text-4xl font-bold text-center text-white mb-8">
        {t("why")}
      </h2>
      <div className="w-84 mx-auto h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-8 border border-gray-700 text-left transition-transform transform hover:-translate-y-2 hover:scale-105 hover:border-red-500 duration-300 ease-in-out"
            style={{ borderRadius: "0px" }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-red-500 p-4 rounded-full">
                <span className="text-3xl text-white">{benefit.icon}</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              {benefit.title}
            </h3>
            <p className="text-gray-400">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
