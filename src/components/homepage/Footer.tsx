import { useTranslation } from "../../redux/lang/slice";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  {
    t("name");
  }
  return (
    <footer className="border-t-4 border-red-700 pt-6 pb-12 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">&copy; {t("footerCopyright")}</p>
        <div className="flex space-x-4">
          <a
            href="https://goit.global/us/policy/"
            target="_blank"
            className="text-sm hover:underline hover:text-gray-400 transition-colors duration-300 cursor-pointer"
          >
            {t("footerPrivacyPolicy")}
          </a>
          <a
            href="https://goit.global/us/terms/"
            target="_blank"
            className="text-sm hover:underline hover:text-gray-400 transition-colors duration-300 cursor-pointer"
          >
            {t("footerTermsOfService")}
          </a>
          <a
            href="mailto: aozyrskyii@gmail.com"
            className="text-sm hover:underline hover:text-gray-400 transition-colors duration-300 cursor-pointer"
          >
            {t("footerContact")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
