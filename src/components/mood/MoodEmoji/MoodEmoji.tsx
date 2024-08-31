import { Field } from "formik";

type Props = {
  name: string;
};

const moodEmojis = ["😞", "😕", "😐", "😊", "😁"];

const MoodEmoji: React.FC<Props> = ({ name }) => (
  <div>
    {moodEmojis.map((emoji, index) => (
      <label key={index}>
        <Field type="radio" name={name} value={String(index + 1)} />
        {emoji}
      </label>
    ))}
  </div>
);

export default MoodEmoji;
