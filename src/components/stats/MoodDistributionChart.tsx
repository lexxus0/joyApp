import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useAppSelector } from "../../redux/hooks";
import { selectMoodNotes } from "../../redux/mood/selectors";

const COLORS = ["#FF8042", "#FF6384", "#FFBB28", "#00C49F", "#0088FE"];
const MOOD_LABELS = [
  "Very Bad 😞",
  "Bad 😕",
  "Neutral 😐",
  "Good 😊",
  "Very Good 😁",
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
    name: MOOD_LABELS[index], 
    value: count,
  }));

  return (
    <div className="flex justify-center items-center">
      <ResponsiveContainer width="50%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
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
      <div className="w-1/4 flex flex-col justify-center pl-8">
        {MOOD_LABELS.map((label, index) => (
          <div key={index} className="mb-2 flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodDistributionChart;
