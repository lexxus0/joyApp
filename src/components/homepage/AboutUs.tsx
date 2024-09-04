import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { useTranslation } from "../../redux/lang/slice";

const AboutUs: React.FC = () => {
  const { t } = useTranslation();

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
    <div className="w-full max-w-5xl p-6 mx-auto bg-transparent text-white rounded-lg">
      <h2 className="text-4xl font-bold mb-8 text-center">
        {t("aboutUsTitle")}
      </h2>
      <div className="w-84 mx-auto h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-8"></div>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between items-center w-full px-6 py-4 text-lg font-semibold text-left text-gray-400 bg-gray-900 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 transition duration-300 ease-in-out hover:bg-gray-800">
                  <span>{section.title}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "transform rotate-180" : ""
                    } w-6 h-6 text-gray-400 transition-transform duration-300`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel
                  className="px-6 py-4 text-gray-300 bg-gray-800 rounded-b-lg"
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
