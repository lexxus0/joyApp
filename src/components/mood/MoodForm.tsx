import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../redux/hooks";
import { addNote } from "../../redux/mood/slice";
import DatePicker from "react-datepicker";
import { useState, useRef } from "react";
import MoodEmoji from "./MoodEmoji";
import DrawingSandbox, { DrawingSandboxRef } from "../draw/DrawingSandbox";

const MoodForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [submit, setSubmit] = useState<string | null>(null);
  const drawingRef = useRef<DrawingSandboxRef>(null);

  const initialValues = {
    title: "",
    dateTime: new Date(),
    mood: 3,
    description: "",
    drawing: "",
  };

  const moodValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    dateTime: Yup.date().required("Date is required"),
    description: Yup.string()
      .max(1000, "Description should not exceed 1000 characters")
      .required("Description is required"),
    drawing: Yup.string(),
  });

  const handleSubmit = (
    values: {
      title: string;
      dateTime: Date;
      mood: number;
      description: string;
      drawing: string;
    },
    {
      resetForm,
    }: FormikHelpers<{
      title: string;
      dateTime: Date;
      mood: number;
      description: string;
      drawing: string;
    }>
  ) => {
    dispatch(
      addNote({
        ...values,
        date: values.dateTime.toISOString().split("T")[0],
        time: values.dateTime.toISOString().split("T")[1].split(".")[0],
      })
    );
    setSubmit("Note has been added successfully!");
    setTimeout(() => setSubmit(null), 1500);
    resetForm();
    if (drawingRef.current) {
      drawingRef.current.clearCanvas();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Share Your Mood!
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={moodValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-gray-700 mb-1">
                Title
              </label>
              <Field
                name="title"
                placeholder="Enter title..."
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage
                name="title"
                component="span"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="dateTime" className="text-gray-700 mb-1">
                Time
              </label>
              <DatePicker
                selected={values.dateTime}
                onChange={(date: Date | null) =>
                  setFieldValue("dateTime", date || new Date())
                }
                showTimeSelect
                dateFormat="yyyy/MM/dd HH:mm"
                timeFormat="HH:mm"
                timeIntervals={1}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage
                name="dateTime"
                component="span"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">
                Choose the emoji that best describes your mood.
              </label>
              <MoodEmoji name="mood" />
              <ErrorMessage
                name="mood"
                component="span"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="text-gray-700 mb-1">
                Description
              </label>
              <Field
                name="description"
                as="textarea"
                placeholder="Add a description..."
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-40"
              />
              <ErrorMessage
                name="description"
                component="span"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">
                Draw your feelings if you'd like to!
              </label>
              <DrawingSandbox
                ref={drawingRef}
                drawing={values.drawing}
                onDrawingChange={(drawing) => setFieldValue("drawing", drawing)}
              />
              <ErrorMessage
                name="drawing"
                component="span"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding..." : "Add Note"}
            </button>
            {submit && (
              <div className="text-green-500 text-center mt-4">{submit}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MoodForm;
