import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser, loginUserWithGoogle } from "../../redux/auth/operations";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

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
    dispatch(loginUser(values));
  };

  const handleGoogleLogin = () => {
    dispatch(loginUserWithGoogle());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/mood");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
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
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-gray-600">
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Login"}
            </button>
            {error && (
              <div className="text-red-500 text-center mt-2">{error}</div>
            )}
            <div id="recaptcha-container"></div>
          </Form>
        )}
      </Formik>
      <button
        onClick={handleGoogleLogin}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginForm;
