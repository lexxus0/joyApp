import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectMoodNotes } from "../../redux/mood/selectors";

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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-500">Note not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg border border-gray-300 max-w-4xl w-full relative">
        <p className="absolute top-2 right-2 text-gray-500 text-sm">
          {note.date}
        </p>
        <h2 className="text-center xt-3xl font-semibold text-blue-800 mb-4 p-4 border-b border-gray-200">
          {note.title}
        </h2>
        <div className="p-6">
          <p className="text-lg text-gray-700 mb-2">
            Mood: <span className="text-xl">{moodEmojiMap[note.mood]}</span>
          </p>
          <p className="text-lg text-gray-700 mb-4">{note.description}</p>
          {note.drawing && (
            <div className="mt-4">
              <img
                src={note.drawing}
                alt="Drawing"
                className="w-full h-auto border border-gray-300 rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteDetailsPage;
