import { useAppSelector } from "../../redux/hooks";
import { selectMoodNotes } from "../../redux/mood/selectors";
import { useTranslation } from "../../redux/lang/selectors";

const DashboardOverview: React.FC = () => {
  const { t } = useTranslation();
  const notes = useAppSelector(selectMoodNotes);

  const totalNotes = notes.length;

  const positiveNotes = notes.filter((note) => note.mood > 3).length;
  const positivePercentage = ((positiveNotes / totalNotes) * 100).toFixed(2);

  const moodMap: {
    [key in 1 | 2 | 3 | 4 | 5]: { emoji: string; description: string };
  } = {
    1: { emoji: "😞", description: t("veryBad") },
    2: { emoji: "😕", description: t("bad") },
    3: { emoji: "😐", description: t("neutral") },
    4: { emoji: "😊", description: t("good") },
    5: { emoji: "😁", description: t("veryGood") },
  };

  const moodCounts = notes.reduce((acc, note) => {
    acc[note.mood] = (acc[note.mood] || 0) + 1;
    return acc;
  }, {} as { [key: number]: number });

  const mostFrequentMood = Object.keys(moodCounts).reduce((a, b) =>
    moodCounts[parseInt(a)] > moodCounts[parseInt(b)] ? a : b
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-blue-500 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">{t("totalNotes")}</h3>
        <p className="text-2xl">{totalNotes}</p>
      </div>
      <div className="bg-green-500 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">{t("positiveMoods")}</h3>
        <p className="text-2xl">{positivePercentage}%</p>
      </div>
      <div className="bg-yellow-500 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">{t("mostFrequentMood")}</h3>
        <p className="text-2xl">
          {moodMap[parseInt(mostFrequentMood) as 1 | 2 | 3 | 4 | 5].emoji}{" "}
          <span className="text-sm text-gray-700">
            (
            {
              moodMap[parseInt(mostFrequentMood) as 1 | 2 | 3 | 4 | 5]
                .description
            }
            )
          </span>
        </p>
      </div>
    </div>
  );
};

export default DashboardOverview;
