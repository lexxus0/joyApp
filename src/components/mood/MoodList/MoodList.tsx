import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectMoodNotes } from "../../../redux/mood/selectors";

const moodEmojiMap: { [key: number]: string } = {
  1: "😞",
  2: "😕",
  3: "😐",
  4: "😊",
  5: "😁",
};

const MoodList: React.FC = () => {
  const notes = useAppSelector(selectMoodNotes);
  const navigate = useNavigate();

  type NotesType = {
    title: string;
    date: string;
    mood: number;
    description: string;
  };

  const handleNoteClick = (index: number) => {
    navigate(`/mood/${index}`);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Mood List</h2>
      {notes.length === 0 ? (
        <p className="text-xl text-gray-500">No mood entries found.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note: NotesType, index: number) => (
            <li
              key={index}
              onClick={() => handleNoteClick(index)}
              className="cursor-pointer p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition-colors"
            >
              <strong className="block text-xl text-gray-700 truncate">
                {note.title}
              </strong>
              <p className="text-sm text-gray-500 mb-2">Date: {note.date}</p>
              <p className="text-sm text-gray-500 mb-2">
                Mood: <span className="text-xl">{moodEmojiMap[note.mood]}</span>
              </p>
              <p className="text-sm text-gray-600 truncate">
                {note.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoodList;
