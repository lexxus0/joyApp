import { Field } from "formik";
import { useState } from "react";

type Props = {
  name: string;
};

const moodEmojis = ["😞", "😕", "😐", "😊", "😁"];

const MoodEmoji: React.FC<Props> = ({ name }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  return (
    <div className="flex justify-between">
      {moodEmojis.map((emoji, index) => {
        const value = String(index + 1);
        return (
          <label
            key={index}
            className={`flex-1 p-4 text-3xl cursor-pointer flex justify-center items-center transition-transform duration-300 ease-in-out transform rounded-full ${
              selectedValue === value
                ? "scale-110 text-yellow-500 shadow-lg"
                : "text-gray-700"
            } hover:scale-110 hover:text-blue-500 hover:shadow-xl`}
            htmlFor={`mood-${index}`}
            onClick={() => setSelectedValue(value)}
          >
            <Field
              type="radio"
              name={name}
              value={value}
              id={`mood-${index}`}
              className="sr-only"
              onChange={() => setSelectedValue(value)}
            />
            {emoji}
          </label>
        );
      })}
    </div>
  );
};

export default MoodEmoji;
