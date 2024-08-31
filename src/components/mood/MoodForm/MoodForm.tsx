import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../redux/hooks";
import { addNote } from "../../../redux/mood/slice";
import DatePicker from "react-datepicker";
import { useState } from "react";
import MoodEmoji from "../MoodEmoji/MoodEmoji";

const MoodForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [submit, setSubmit] = useState<string | null>(null);

  const initialValues = { date: "", mood: 3, comment: "" };

  const moodValidationSchema = Yup.object().shape({
    date: Yup.string().required("Required"),
    comment: Yup.string().max(300, "Comment too long"),
  });

  const handleSubmit = (values: {
    date: string;
    mood: number;
    comment: string;
  }) => {
    dispatch(addNote(values));
    setSubmit("Note has been added successfully!");
    setTimeout(() => setSubmit(null), 3000);
  };

  return (
    <div>
      <h2>Share your mood!</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={moodValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="date">Date</label>
              <DatePicker
                selected={values.date ? new Date(values.date) : null}
                onChange={(date: Date | null) =>
                  setFieldValue(
                    "date",
                    date ? date.toISOString().split("T")[0] : ""
                  )
                }
                dateFormat="yyyy/MM/dd"
              />
              <ErrorMessage name="date" component="span" />
            </div>
            <div>
              <label>Mood</label>
              <MoodEmoji name="mood" />
              <ErrorMessage name="mood" component="span" />
            </div>
            <div>
              <label htmlFor="comment">Comment</label>
              <Field
                name="comment"
                as="textarea"
                placeholder="Add a comment..."
              />
              <ErrorMessage name="comment" component="span" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Mood"}
            </button>
            {submit && <div>{submit}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MoodForm;
