import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../redux/lang/slice";

const MoodPage = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const goToForm = () => navigate("/mood/form");
  const goToList = () => navigate("/mood/list");

  return (
    <div className="bg-gray-100 pt-14">
      <div className="flex justify-center mb-6">
        <button
          onClick={goToForm}
          className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {t("addNewMood")}
        </button>
        <button
          onClick={goToList}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          View Mood List
        </button>
      </div>
    </div>
  );
};

export default MoodPage;
