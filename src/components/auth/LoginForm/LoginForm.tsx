import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../../redux/auth/operations";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
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

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={userValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="span" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="span" />
            </div>
            <button type="submit" disabled={isLoading || isSubmitting}>
              {isLoading ? "Processing..." : "Register"}
            </button>
            {error && <div>{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
