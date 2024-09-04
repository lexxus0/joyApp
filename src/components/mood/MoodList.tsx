import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectFilteredMood } from "../../redux/filter/selectors";
import { fetchNotesFromFirestore } from "../../redux/mood/slice";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "../../redux/lang/slice";

const moodEmojiMap: { [key: number]: string } = {
  1: "😞",
  2: "😕",
  3: "😐",
  4: "😊",
  5: "😁",
};

const MoodList: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectFilteredMood);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 10;

  useEffect(() => {
    dispatch(fetchNotesFromFirestore());
  }, [dispatch]);

  const totalPages = Math.ceil(notes.length / notesPerPage);

  const paginatedNotes = notes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage
  );

  const handleNoteClick = (index: number) => {
    navigate(`/mood/${index}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <div className="p-6 bg-gray-900 shadow-lg rounded-lg max-w-6xl mx-auto mt-3">
        <h2 className="text-3xl font-bold text-white mb-4">
          {t("moodListTitle")}
        </h2>
        {notes.length === 0 ? (
          <p className="text-xl text-gray-400"> {t("noEntriesFound")}</p>
        ) : (
          <div className="overflow-hidden">
            <table className="w-full table-auto">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {t("tableTitle")}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {t("tableDate")}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {t("tableMood")}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {t("tableDescription")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-500">
                {paginatedNotes.map((note, index) => (
                  <tr
                    key={index}
                    onClick={() => handleNoteClick(index)}
                    className="cursor-pointer hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 max-w-xs truncate">
                      {note.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(note.dateTime).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap  text-2xl text-center text-gray-400">
                      {moodEmojiMap[note.mood]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 max-w-xs truncate">
                      {note.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-white ${
              currentPage === 1 && " cursor-not-allowed"
            }`}
          >
            <FaArrowLeft />
          </button>
          <span className="text-white">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-white ${
              currentPage === totalPages && "cursor-not-allowed"
            }`}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default MoodList;
