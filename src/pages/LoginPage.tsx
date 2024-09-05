import LoginForm from "../components/auth/LoginForm";
import { useAppSelector } from "../redux/hooks";
import { selectTheme } from "../redux/theme/selectors";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "../redux/lang/selectors";

const LoginPage = () => {
  const { t } = useTranslation();
  const selectedTheme = useAppSelector(selectTheme);

  return (
    <>
      <Helmet>
        <title>Login page</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="pt-32 flex items-center justify-center min-h-screen ">
        <div
          className={`border-2 p-8 rounded-lg shadow-md max-w-md w-full ${
            selectedTheme === "dark"
              ? " border-red-600 text-white"
              : " border-red-500 text-gray-900"
          }`}
        >
          <h1 className="text-2xl font-bold mb-4 text-center">
            {t("welcome")}
          </h1>
          <p className="text-center text-gray-400 mb-6">{t("loginPrompt")}</p>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
