import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectMoodNotes } from "../redux/mood/selectors";
import { selectTheme } from "../redux/theme/selectors";
import { Helmet } from "react-helmet-async";

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
  const selectedTheme = useAppSelector(selectTheme);

  if (!note) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          selectedTheme === "dark" ? " text-gray-500" : " text-gray-800"
        }`}
      >
        <p className="text-xl">Note not found</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Note details</title>
        <meta name="description" content="Note details" />
      </Helmet>
      <div className="p-6 pt-40 min-h-screen flex items-center justify-center ">
        <div
          className={`shadow-lg rounded-lg border max-w-4xl w-full relative ${
            selectedTheme === "dark"
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-gray-100 border-gray-300 text-gray-900"
          }`}
        >
          <p className="absolute top-2 right-2 text-sm">
            {new Date(note.dateTime).toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
          <h2 className="text-center text-3xl font-semibold mb-4 p-4 border-b">
            {note.title}
          </h2>
          <div className="p-6">
            <p className="text-lg mb-2">
              Mood: <span className="text-xl">{moodEmojiMap[note.mood]}</span>
            </p>
            <p className="text-lg mb-4">{note.description}</p>
            {note.drawing && (
              <div className="mt-4">
                <img
                  src={note.drawing}
                  alt="Drawing"
                  className="w-full h-auto border bg-gray-100 rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteDetailsPage;
