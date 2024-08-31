import { useAppSelector } from "../../../redux/hooks";
import { selectMoodNotes } from "../../../redux/mood/selectors"; //////

const MoodList: React.FC = () => {
  const notes = useAppSelector(selectMoodNotes);

  return (
    <div>
      <h2>Mood Entries</h2>
      {notes.length === 0 ? (
        <p>No mood entries found.</p>
      ) : (
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              <strong>{note.date}</strong> - Mood: {note.mood} - {note.comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoodList;
