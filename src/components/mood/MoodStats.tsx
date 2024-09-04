import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectMoodNotes } from "../../redux/mood/selectors";
import { fetchNotesFromFirestore } from "../../redux/mood/slice";
import { Line } from "react-chartjs-2";
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
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectMoodNotes);

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
        borderColor: "rgba(255, 255, 255, 1)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
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
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          color: "#ffffff",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#ffffff",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        titleColor: "#000000",
        bodyColor: "#000000",
        cornerRadius: 4,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-900 dark:bg-gray-900 shadow-md rounded-lg mt-16">
      <h2 className="text-4xl font-bold text-center text-white mb-8">
        Mood Statistics
      </h2>
      <div className="mb-8 text-white">
        <ul>
          <li>Very Bad: {moodCounts[1]}</li>
          <li>Bad: {moodCounts[2]}</li>
          <li>Neutral: {moodCounts[3]}</li>
          <li>Good: {moodCounts[4]}</li>
          <li>Very Good: {moodCounts[5]}</li>
        </ul>
      </div>
      <div>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default MoodStats;
