import { useTranslation } from "../../redux/lang/selectors";
import { useAppSelector } from "../../redux/hooks";
import { selectTheme } from "../../redux/theme/selectors";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const selectedTheme = useAppSelector(selectTheme);

  return (
    <footer
      className={`border-t-4 pt-6 pb-12 px-4 ${
        selectedTheme === "dark" ? "border-red-700" : "border-red-500"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <p
          className={`text-sm ${
            selectedTheme === "dark" ? "text-gray-100" : "text-gray-700"
          }`}
        >
          &copy; {t("footerCopyright")}
        </p>
        <div className="flex space-x-4">
          <a
            href="https://goit.global/us/policy/"
            target="_blank"
            className={`text-sm hover:underline ${
              selectedTheme === "dark"
                ? "text-gray-100 hover:text-gray-400"
                : "text-gray-700 hover:text-gray-500"
            } transition-colors duration-300 cursor-pointer`}
          >
            {t("footerPrivacyPolicy")}
          </a>
          <a
            href="https://goit.global/us/terms/"
            target="_blank"
            className={`text-sm hover:underline ${
              selectedTheme === "dark"
                ? "text-gray-100 hover:text-gray-400"
                : "text-gray-700 hover:text-gray-500"
            } transition-colors duration-300 cursor-pointer`}
          >
            {t("footerTermsOfService")}
          </a>
          <a
            href="mailto: aozyrskyii@gmail.com"
            className={`text-sm hover:underline ${
              selectedTheme === "dark"
                ? "text-gray-100 hover:text-gray-400"
                : "text-gray-700 hover:text-gray-500"
            } transition-colors duration-300 cursor-pointer`}
          >
            {t("footerContact")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
