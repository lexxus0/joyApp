import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectMoodNotes } from "../../../redux/mood/selectors";
import { fetchNotesFromFirestore } from "../../../redux/mood/slice";
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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
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
    labels: ["😞", "😕", "😐", "😊", "😁"], // Смайли замість текстових міток
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
        borderColor: "rgba(0, 0, 0, 1)", // Чорний колір лінії
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Прозорий чорний колір фону
        borderWidth: 2,
        fill: true,
        tension: 0, // Робить лінію більш гладкою
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        ticks: {
          color: "#4A4A4A",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#4A4A4A",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        cornerRadius: 4,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg mt-6">
      <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Mood Statistics
      </h2>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Mood Count
        </h3>
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
