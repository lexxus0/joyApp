import { Field } from "formik";

type Props = {
  name: string;
  value: string;
  onChange: (value: string) => void;
};

const moodEmojis = ["😞", "😕", "😐", "😊", "😁"];

const MoodEmoji: React.FC<Props> = ({ name, value, onChange }) => {
  return (
    <div className="flex justify-between">
      {moodEmojis.map((emoji, index) => {
        const moodValue = String(index + 1);
        return (
          <label
            key={index}
            className={`flex-1 p-4 text-3xl cursor-pointer flex justify-center items-center transition-transform duration-300 ease-in-out transform rounded-full ${
              value === moodValue
                ? "scale-110 text-yellow-500 shadow-lg"
                : "text-gray-700"
            } hover:scale-110 hover:text-blue-500 hover:shadow-xl`}
            htmlFor={`mood-${index}`}
            onClick={() => onChange(moodValue)}
          >
            <Field
              type="radio"
              name={name}
              value={moodValue}
              id={`mood-${index}`}
              className="sr-only"
            />
            {emoji}
          </label>
        );
      })}
    </div>
  );
};

export default MoodEmoji;
