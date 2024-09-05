import { useSelector } from "react-redux";
import { selectTheme } from "../redux/theme/selectors";
import { Helmet } from "react-helmet-async";

const NotFoundPage = () => {
  const selectedTheme = useSelector(selectTheme);

  return (
    <>
      <Helmet>
        <title>404</title>
        <meta name="description" content="404" />
      </Helmet>
      <div
        className={`min-h-screen flex flex-col items-center justify-center ${
          selectedTheme === "dark" ? " text-white" : " text-gray-900"
        }`}
      >
        <div className="text-center">
          <h1 className="text-9xl font-bold mb-4">404</h1>
          <p className="text-2xl font-medium mb-6">
            Oops! The page you're looking for doesn't exist.
          </p>
          <a
            href="/"
            className={`text-lg underline ${
              selectedTheme === "dark" ? "text-blue-400" : "text-blue-900"
            }`}
          >
            Go back to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
