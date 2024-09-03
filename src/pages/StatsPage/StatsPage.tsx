import MoodTrendChart from "../../components/stats/stats2";
import AverageMoodByWeekdayChart from "../../components/stats/stats3";
import MoodDistributionChart from "../../components/stats/stats1";

const StatsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Mood Statistics</h1>

      <MoodDistributionChart />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Mood Trend Over Time</h2>
        <MoodTrendChart />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Average Mood by Weekday</h2>
        <AverageMoodByWeekdayChart />
      </div>
    </div>
  );
};

export default StatsPage;
