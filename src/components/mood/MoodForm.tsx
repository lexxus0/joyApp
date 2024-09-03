import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../redux/hooks";
import { addNoteAsync } from "../../redux/mood/slice";
import DatePicker from "react-datepicker";
import { useState, useRef } from "react";
import MoodEmoji from "./MoodEmoji";
import DrawingSandbox, { DrawingSandboxRef } from "../draw/DrawingSandbox";
import { AiOutlineCalendar, AiOutlineFileText } from "react-icons/ai";
import { MdMood, MdDraw } from "react-icons/md";

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
      .max(3000, "Description should not exceed 3000 characters")
      .required("Description is required"),
    drawing: Yup.string(),
    mood: Yup.number().required("Mood is required"),
  });

  const handleSubmit = async (
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
    await dispatch(
      addNoteAsync({
        ...values,
        dateTime: values.dateTime.toISOString(),
      })
    );

    setSubmit("Note added successfully!");
    resetForm();
    if (drawingRef.current) {
      drawingRef.current.clearCanvas();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-blue-200 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Share Your Mood
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={moodValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="flex items-center text-gray-700 mb-2"
              >
                <AiOutlineFileText className="mr-2 text-gray-600" /> Title
              </label>
              <Field
                name="title"
                placeholder="Enter title..."
                className="p-3 border border-cyan-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="dateTime"
                className="flex items-center text-gray-700 mb-2"
              >
                <AiOutlineCalendar className="mr-2 text-gray-600" /> Time
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
                className="p-3 bg-transparent border border-cyan-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage
                name="dateTime"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="flex items-center text-gray-700 mb-2"
              >
                <AiOutlineFileText className="mr-2 text-gray-600" /> Description
              </label>
              <Field
                name="description"
                as="textarea"
                placeholder="Add a description..."
                className="p-3 border bg-transparent border-cyan-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-40"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="flex items-center text-gray-700 mb-2">
                <MdMood className="mr-2 text-gray-600" /> Choose the emoji that
                best describes your mood
              </label>
              <MoodEmoji
                name="mood"
                value={String(values.mood)}
                onChange={(mood) => setFieldValue("mood", Number(mood))}
              />
              <ErrorMessage
                name="mood"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex flex-col">
              <label className="flex items-center text-gray-700 mb-2">
                <MdDraw className="mr-2 text-gray-600" /> Draw your feelings if
                you'd like to!
              </label>
              <DrawingSandbox
                ref={drawingRef}
                drawing={values.drawing}
                onDrawingChange={(drawing) => setFieldValue("drawing", drawing)}
              />
              <ErrorMessage
                name="drawing"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0 || isSubmitting}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
