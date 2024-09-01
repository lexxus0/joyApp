import MoodForm from "../../components/mood/MoodForm";
import MoodList from "../../components/mood/MoodList/MoodList";

const MoodPage = () => {
  return (
    <div className="bg-gray-100 pt-14">
      <MoodForm />
      <MoodList />
    </div>
  );
};

export default MoodPage;
