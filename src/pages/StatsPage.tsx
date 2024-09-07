import MoodTrendChart from "../components/stats/MoodTrendChart";
import AverageMoodByWeekdayChart from "../components/stats/MoodDistributionChart";
import MoodDistributionChart from "../components/stats/DashboardOverview";
import { useAppSelector } from "../redux/hooks";
import { selectTheme } from "../redux/theme/selectors";
import { useTranslation } from "../redux/lang/selectors";
import { Helmet } from "react-helmet-async";

const StatsPage = () => {
  const theme = useAppSelector(selectTheme);
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>Statistics</title>
        <meta name="description" content="Statistics" />
      </Helmet>

      <div
        className={`${
          theme === "dark" ? "text-gray-200" : "text-gray-900"
        }  container mt-36 mx-auto p-4`}
      >
        <h1 className="text-3xl font-bold mb-4">{t("statsPageTitle")}</h1>

        <MoodDistributionChart />

        <div
          className={`${
            theme === "dark" ? "text-gray-200" : "text-gray-900"
          } mt-8`}
        >
          <h2 className="text-2xl font-semibold mb-4">
            {t("moodTrendOverTime")}
          </h2>
          <MoodTrendChart />
        </div>

        <div
          className={`${
            theme === "dark" ? "text-gray-200" : "text-gray-900"
          } mt-8`}
        >
          <h2 className="text-2xl font-semibold mb-4">
            {t("averageMoodByWeekday")}
          </h2>
          <AverageMoodByWeekdayChart />
        </div>
      </div>
    </>
  );
};

export default StatsPage;
