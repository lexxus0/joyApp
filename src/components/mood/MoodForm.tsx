import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../redux/hooks";
import { addNoteAsync } from "../../redux/mood/operations";
import DatePicker from "react-datepicker";
import { useEffect, useRef, useState } from "react";
import MoodEmoji from "./MoodEmoji";
import DrawingSandbox, { DrawingSandboxRef } from "../draw/DrawingSandbox";
import { AiOutlineCalendar, AiOutlineFileText } from "react-icons/ai";
import { MdMood, MdDraw } from "react-icons/md";
import { useTranslation } from "../../redux/lang/selectors";
import { selectTheme } from "../../redux/theme/selectors";
import { useAppSelector } from "../../redux/hooks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectCompletedAchievements } from "../../redux/achievements/selectors";

const MoodForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const drawingRef = useRef<DrawingSandboxRef>(null);
  const selectedTheme = useAppSelector(selectTheme);

  const completedAchievements = useAppSelector(selectCompletedAchievements);

  const [initialCompletedCount, setInitialCompletedCount] = useState(
    completedAchievements.length
  );

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
    const formattedDateTime = values.dateTime.toLocaleString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    await dispatch(
      addNoteAsync({
        ...values,
        dateTime: formattedDateTime,
      })
    );

    setInitialCompletedCount(completedAchievements.length);

    resetForm();
    if (drawingRef.current) {
      drawingRef.current.clearCanvas();
    }
  };

  useEffect(() => {
    const newCompletedCount = completedAchievements.length;
    if (newCompletedCount > initialCompletedCount) {
      const newAchievement = completedAchievements[initialCompletedCount];
      toast.success(`Achievement unlocked:  ${newAchievement.title}`);
    }
  }, [completedAchievements, initialCompletedCount]);

  return (
    <div
      className={`max-w-xl mt-40 mb-20 mx-auto p-8 shadow-lg rounded-lg ${
        selectedTheme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <ToastContainer
        autoClose={2500}
        theme={selectedTheme === "dark" ? "dark" : "light"}
      />

      <h2
        className={`text-3xl font-bold text-center mb-6 ${
          selectedTheme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        {t("shareYourMoodTitle")}
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
                className={`flex items-center mb-2 ${
                  selectedTheme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <AiOutlineFileText className="mr-2" /> {t("titleLabel")}
              </label>
              <Field
                name="title"
                placeholder={t("titlePlaceholder")}
                className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  selectedTheme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
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
                className={`flex items-center mb-2 ${
                  selectedTheme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <AiOutlineCalendar className="mr-2" /> {t("timeLabel")}
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
                className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  selectedTheme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
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
                className={`flex items-center mb-2 ${
                  selectedTheme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <AiOutlineFileText className="mr-2" /> {t("descriptionLabel")}
              </label>
              <Field
                name="description"
                as="textarea"
                placeholder={t("descriptionPlaceholder")}
                className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-28 ${
                  selectedTheme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label
                className={`flex items-center mb-2 ${
                  selectedTheme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <MdMood className="mr-2" /> {t("moodLabel")}
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
              <label
                className={`flex items-center mb-2 ${
                  selectedTheme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <MdDraw className="mr-2" /> {t("drawingLabel")}
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
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t("addingButton") : t("addNoteButton")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MoodForm;
