import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { selectFilteredMood } from "../../../redux/filter/selectors";
import { fetchNotesFromFirestore } from "../../../redux/mood/slice";

const moodEmojiMap: { [key: number]: string } = {
  1: "😞",
  2: "😕",
  3: "😐",
  4: "😊",
  5: "😁",
};

const MoodList: React.FC = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectFilteredMood);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNotesFromFirestore());
  }, [dispatch]);

  const handleNoteClick = (index: number) => {
    navigate(`/mood/${index}`);
  };

  console.log("Rendering notes:", notes);

  return (
    <>
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-6xl mx-auto mt-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Mood List</h2>
        {notes.length === 0 ? (
          <p className="text-xl text-gray-500">No mood entries found.</p>
        ) : (
          <div className="overflow-hidden">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Mood
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {notes.map((note, index) => (
                  <tr
                    key={index}
                    onClick={() => handleNoteClick(index)}
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-xs truncate">
                      {note.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {note.dateTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {moodEmojiMap[note.mood]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      {note.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MoodList;
