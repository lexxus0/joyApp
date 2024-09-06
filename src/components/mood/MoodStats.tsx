import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectMoodNotes } from "../../redux/mood/selectors";
import { fetchNotesFromFirestore } from "../../redux/mood/operations";
import { Line } from "react-chartjs-2";
import { useTranslation } from "../../redux/lang/selectors";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { selectTheme } from "../../redux/theme/selectors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MoodStats: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectMoodNotes);
  const selectedTheme = useAppSelector(selectTheme);

  useEffect(() => {
    dispatch(fetchNotesFromFirestore());
  }, [dispatch]);

  const moodCounts = notes.reduce(
    (acc: { [key: number]: number }, note) => {
      acc[note.mood] = (acc[note.mood] || 0) + 1;
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );

  const chartData = {
    labels: ["😞", "😕", "😐", "😊", "😁"],
    datasets: [
      {
        label: "Mood Count",
        data: [
          moodCounts[1],
          moodCounts[2],
          moodCounts[3],
          moodCounts[4],
          moodCounts[5],
        ],
        borderColor:
          selectedTheme === "dark"
            ? "rgba(255, 255, 255, 1)"
            : "rgba(0, 0, 0, 1)",
        backgroundColor:
          selectedTheme === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color:
            selectedTheme === "dark"
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.2)",
        },
        ticks: {
          color: selectedTheme === "dark" ? "#ffffff" : "#000000",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: selectedTheme === "dark" ? "#ffffff" : "#000000",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor:
          selectedTheme === "dark"
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(0, 0, 0, 0.8)",
        titleColor: selectedTheme === "dark" ? "#000000" : "#ffffff",
        bodyColor: selectedTheme === "dark" ? "#000000" : "#ffffff",
        cornerRadius: 4,
      },
    },
  };

  return (
    <div
      className={`max-w-4xl mx-auto p-8 shadow-md rounded-lg mt-16 ${
        selectedTheme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-teal-300 text-gray-900"
      }`}
    >
      <h2 className="text-4xl font-bold text-center mb-8">
        {t("moodStatsTitle")}
      </h2>
      <div className="mb-8">
        <ul>
          <li>
            {t("veryBad")}: {moodCounts[1]}
          </li>
          <li>
            {t("bad")}: {moodCounts[2]}
          </li>
          <li>
            {t("neutral")}: {moodCounts[3]}
          </li>
          <li>
            {t("good")}: {moodCounts[4]}
          </li>
          <li>
            {t("veryGood")}: {moodCounts[5]}
          </li>
        </ul>
      </div>
      <div>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default MoodStats;
