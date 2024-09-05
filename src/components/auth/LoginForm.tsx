import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser, loginUserWithGoogle } from "../../redux/auth/operations";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useTranslation } from "../../redux/lang/selectors";
import { selectTheme } from "../../redux/theme/selectors";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const selectedTheme = useAppSelector(selectTheme);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const initialValues = { email: "", password: "", rememberMe: false };

  const userValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("requiredField"))
      .matches(EMAIL_REGEX, t("emailError"))
      .min(6, t("emailMinError"))
      .max(50, t("emailMaxError")),
    password: Yup.string()
      .required(t("requiredField"))
      .min(6, t("passwordMinError"))
      .max(50, t("passwordMaxError")),
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    dispatch(loginUser({ ...values, rememberMe }));
  };

  const handleGoogleLogin = () => {
    dispatch(loginUserWithGoogle());
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/mood");
      }
    });

    return () => unsub();
  }, [navigate]);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={userValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form className="space-y-6">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className={`mb-1 ${
                  selectedTheme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {t("emailLabel")}
              </label>
              <Field
                name="email"
                type="text"
                className={`p-2 border rounded focus:outline-none focus:border-blue-500 ${
                  selectedTheme === "dark"
                    ? "bg-transparent border-gray-300 text-gray-100"
                    : "bg-white border-gray-400 text-gray-900"
                }`}
              />
              <ErrorMessage
                name="email"
                component="span"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col relative">
              <label
                htmlFor="password"
                className={`mb-1 ${
                  selectedTheme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {t("passwordLabel")}
              </label>
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                className={`p-2 border rounded focus:outline-none focus:border-blue-500 ${
                  selectedTheme === "dark"
                    ? "bg-transparent border-gray-300 text-gray-100"
                    : "bg-white border-gray-400 text-gray-900"
                }`}
              />
              <button
                type="button"
                className="absolute right-2 top-12 transform -translate-y-1/2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <HiOutlineEyeOff
                    className={`h-5 w-5 ${
                      selectedTheme === "dark"
                        ? "text-gray-500"
                        : "text-gray-900"
                    }`}
                  />
                ) : (
                  <HiOutlineEye
                    className={`h-5 w-5 ${
                      selectedTheme === "dark"
                        ? "text-gray-500"
                        : "text-gray-900"
                    }`}
                  />
                )}
              </button>
              <ErrorMessage
                name="password"
                component="span"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex items-center mb-6">
              <Field
                name="rememberMe"
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
              />
              <label
                htmlFor="rememberMe"
                className={`text-sm ${
                  selectedTheme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {t("rememberMe")}
              </label>
            </div>
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              className={`w-full py-2 rounded transition duration-300 ${
                selectedTheme === "dark"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-blue-700 text-white hover:bg-blue-800"
              } disabled:bg-gray-400 disabled:cursor-not-allowed`}
            >
              {isLoading ? t("processing") : t("loginButton")}
            </button>
            {error && (
              <div className="text-red-500 text-center mt-2">{error}</div>
            )}
          </Form>
        )}
      </Formik>
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className={`mt-4 w-full py-2 rounded transition duration-300 flex items-center justify-center ${
          selectedTheme === "dark"
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-red-700 text-white hover:bg-red-800"
        }`}
      >
        <FcGoogle className="w-6 h-6 mr-2" />
        {t("googleSignIn")}
      </button>
      <div
        className={`mt-4 text-center ${
          selectedTheme === "dark" ? "text-gray-500" : "text-gray-350"
        }`}
      >
        <p className="mb-2">{t("noAccount")}</p>
        <Link
          to="/register"
          className={`font-medium ${
            selectedTheme === "dark"
              ? "text-blue-500 hover:text-blue-600"
              : "text-blue-700 hover:text-blue-800"
          }`}
        >
          {t("registerButton")}
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
