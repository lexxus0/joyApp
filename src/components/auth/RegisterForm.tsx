import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser, loginUserWithGoogle } from "../../redux/auth/operations";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const initialValues = { email: "", password: "" };

  const userValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Required")
      .matches(EMAIL_REGEX, "Invalid email format")
      .min(6, "Email has to be more than 6 characters")
      .max(50, "Email has to be less than 50 characters"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password has to be more than 6 characters")
      .max(50, "Password has to be less than 50 characters"),
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    dispatch(registerUser(values));
  };

  const handleGoogleLogin = () => {
    dispatch(loginUserWithGoogle());
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-4">Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={userValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-gray-600">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="email"
                component="span"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="password" className="mb-1 text-gray-600">
                Password
              </label>
              <Field
                name="password"
                type={showPassword ? "text" : "password"} // Toggle password visibility
                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 pr-10"
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
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Register"}
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
        className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300 flex items-center justify-center"
      >
        <FcGoogle className="w-6 h-6 mr-2" />
        Sign in with Google
      </button>
    </div>
  );
};

export default RegisterForm;
