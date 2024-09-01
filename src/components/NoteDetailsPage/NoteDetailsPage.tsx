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
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-500">Note not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-6">
      <h2 className="break-words text-3xl font-bold text-center text-gray-800 mb-4">
        {note.title}
      </h2>
      <p className="text-lg text-gray-600 mb-2">{note.date}</p>
      <p className="text-lg text-gray-600 mb-2">
        Mood: <span className="text-xl">{moodEmojiMap[note.mood]}</span>
      </p>
      <p className="text-lg text-gray-600 mb-4 break-words">
        {note.description}
      </p>
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
  );
};

export default NoteDetailsPage;
