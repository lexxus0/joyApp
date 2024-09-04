import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser, loginUserWithGoogle } from "../../redux/auth/operations";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useTranslation } from "../../redux/lang/slice";

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const initialValues = { email: "", password: "", rememberMe: true };

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

  const handleSubmit = (values: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    dispatch(registerUser({ ...values }));
  };

  const handleGoogleLogin = () => {
    dispatch(loginUserWithGoogle());
  };

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
              <label htmlFor="email" className="mb-1 text-gray-100">
                {t("emailLabel")}
              </label>
              <Field
                name="email"
                type="text"
                className="p-2 border border-gray-300 rounded bg-transparent focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="email"
                component="span"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="password" className="mb-1 text-gray-100">
                {t("passwordLabel")}
              </label>
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                className="p-2 border bg-transparent border-gray-300 rounded focus:outline-none focus:border-blue-500 pr-10"
              />
              <button
                type="button"
                className="absolute right-2 top-12 transform -translate-y-1/2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <HiOutlineEyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <HiOutlineEye className="h-5 w-5 text-gray-500" />
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
              <label htmlFor="rememberMe" className="text-gray-100 text-sm">
                {t("rememberMe")}
              </label>
            </div>
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? t("processing") : t("registerButton")}
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
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-red-600 transition duration-300 flex items-center justify-center"
      >
        <FcGoogle className="w-6 h-6 mr-2" />
        {t("googleSignIn")}
      </button>
      <div className="text-gray-350 mt-4 text-center">
        <p className="mb-2"> {t("alreadyHaveAccount")}</p>
        <Link
          to="/login"
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          {t("loginLink")}
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
