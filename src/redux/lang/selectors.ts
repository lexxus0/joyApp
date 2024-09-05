import { useAppSelector } from "../hooks";
import { RootState } from "../store";
import { translations } from "./translations";
import { Lang } from "./slice";

export const useTranslation = () => {
  const language = useAppSelector((state: RootState) => state.lang.language);

  const t = (key: keyof (typeof translations)["en"]): string => {
    return translations[language as Lang][key];
  };

  return { t };
};
