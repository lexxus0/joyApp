import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { useTranslation } from "../../redux/lang/selectors";
import { useAppSelector } from "../../redux/hooks";
import { selectTheme } from "../../redux/theme/selectors";

const AboutUs: React.FC = () => {
  const { t } = useTranslation();
  const selectedTheme = useAppSelector(selectTheme);

  const sections = [
    {
      title: t("aboutUsTitle"),
      content: t("aboutUsContent"),
    },
    {
      title: t("featuresTitle"),
      content: t("featuresContent"),
    },
    {
      title: t("privacyTitle"),
      content: t("privacyContent"),
    },
  ];

  return (
    <div className={`w-full max-w-5xl p-6 mx-auto rounded-lg `}>
      <h2
        className={`text-4xl font-bold mb-8 text-center ${
          selectedTheme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        {t("aboutUsTitle")}
      </h2>
      <div
        className={`w-84 mx-auto h-1 rounded-full mb-8 ${
          selectedTheme === "dark"
            ? "bg-gradient-to-r from-blue-400 to-blue-600"
            : "bg-gradient-to-r from-pink-400 to-yellow-600"
        }`}
      ></div>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={`flex justify-between items-center w-full px-6 py-4 text-lg font-semibold text-left transition duration-300 ease-in-out rounded-lg ${
                    selectedTheme === "dark"
                      ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      : "bg-gray-200 text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span>{section.title}</span>
                  <ChevronUpIcon
                    className={`${open ? "transform rotate-180" : ""} w-6 h-6 ${
                      selectedTheme === "dark"
                        ? "text-gray-400"
                        : "text-gray-700"
                    } transition-transform duration-300`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel
                  className={`px-6 py-4 rounded-b-lg ${
                    selectedTheme === "dark"
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-100 text-gray-900"
                  }`}
                  style={{
                    transition: "max-height 0.4s ease-in-out",
                  }}
                >
                  {section.content}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
