import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useAppSelector } from "../../redux/hooks";
import { selectMoodNotes } from "../../redux/mood/selectors";

const COLORS = ["#FF8042", "#FF6384", "#FFBB28", "#00C49F", "#0088FE"];
const MOOD_LABELS = [
  "1 - Very Bad 😞",
  "2 - Bad 😕",
  "3 - Neutral 😐",
  "4 - Good 😊",
  "5 - Very Good 😁",
];

const MoodDistributionChart = () => {
  const notes = useAppSelector(selectMoodNotes);

  const moodCounts = notes.reduce(
    (acc, note) => {
      acc[note.mood - 1] += 1;
      return acc;
    },
    [0, 0, 0, 0, 0]
  );

  const data = moodCounts.map((count, index) => ({
    name: `Mood ${index + 1}`,
    value: count,
  }));

  return (
    <div className="flex">
      <ResponsiveContainer width="60%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="w-1/3 flex flex-col justify-center pl-8">
        {MOOD_LABELS.map((label, index) => (
          <div key={index} className="mb-2">
            <span style={{ color: COLORS[index] }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodDistributionChart;
