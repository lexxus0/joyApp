import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectMoodNotes } from "../redux/mood/selectors";

const moodEmojiMap: { [key: number]: string } = {
  1: "😞",
  2: "😕",
  3: "😐",
  4: "😊",
  5: "😁",
};

const NoteDetailsPage: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const notes = useAppSelector(selectMoodNotes);
  const note = notes[parseInt(noteId || "0")];

  if (!note) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-xl text-gray-500">Note not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 pt-40 bg-transparent min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 shadow-lg rounded-lg border border-gray-700 max-w-4xl w-full relative">
        <p className="absolute top-2 right-2 text-gray-400 text-sm">
          {new Date(note.dateTime).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </p>
        <h2 className="text-center text-3xl font-semibold text-blue-300 mb-4 p-4 border-b border-gray-600">
          {note.title}
        </h2>
        <div className="p-6">
          <p className="text-lg text-gray-300 mb-2">
            Mood: <span className="text-xl">{moodEmojiMap[note.mood]}</span>
          </p>
          <p className="text-lg text-gray-300 mb-4">{note.description}</p>
          {note.drawing && (
            <div className="mt-4">
              <img
                src={note.drawing}
                alt="Drawing"
                className="w-full h-auto border border-gray-600 rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteDetailsPage;
