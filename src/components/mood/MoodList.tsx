import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectFilteredMood } from "../../redux/filter/selectors";
import { fetchNotesFromFirestore } from "../../redux/mood/operations";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "../../redux/lang/selectors";
import { selectTheme } from "../../redux/theme/selectors";

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
  const selectedTheme = useAppSelector(selectTheme);
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
      <div
        className={`p-6 shadow-lg rounded-lg max-w-6xl mx-auto mt-3 ${
          selectedTheme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-teal-300 text-gray-900"
        }`}
      >
        <h2 className="text-3xl font-bold mb-4">{t("moodListTitle")}</h2>
        {notes.length === 0 ? (
          <p
            className={`text-xl ${
              selectedTheme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t("noEntriesFound")}
          </p>
        ) : (
          <div className="overflow-hidden">
            <table className="w-full table-auto">
              <thead className={`${selectedTheme === "dark" && "bg-gray-900"}`}>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    {t("tableTitle")}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    {t("tableDate")}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    {t("tableMood")}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                    {t("tableDescription")}
                  </th>
                </tr>
              </thead>
              <tbody
                className={`${
                  selectedTheme === "dark"
                    ? "bg-gray-900 divide-y divide-gray-500"
                    : "bg-teal-300 divide-y divide-gray-300"
                }`}
              >
                {paginatedNotes.map((note, index) => (
                  <tr
                    key={index}
                    onClick={() => handleNoteClick(index)}
                    className={`cursor-pointer transition-colors ${
                      selectedTheme === "dark"
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium max-w-xs truncate">
                      {note.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(note.dateTime).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-2xl text-left">
                      {moodEmojiMap[note.mood]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm max-w-xs truncate">
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
            className={`px-4 py-2 rounded-lg ${
              selectedTheme === "dark" ? "text-white" : "text-gray-700"
            } ${currentPage === 1 && " cursor-not-allowed"}`}
          >
            <FaArrowLeft />
          </button>
          <span
            className={`${
              selectedTheme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            {notes.length !== 0 && (
              <span>
                {currentPage} / {totalPages}
              </span>
            )}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              selectedTheme === "dark" ? "text-white" : "text-gray-700"
            } ${currentPage === totalPages && "cursor-not-allowed"}`}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default MoodList;
