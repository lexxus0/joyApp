import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { selectTheme } from "../redux/theme/selectors";
import { Achievement } from "../redux/achievements/slice";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "../redux/lang/selectors";

import img1 from "../img/1.webp";
import img2 from "../img/2.webp";
import img3 from "../img/3.webp";
import img4 from "../img/4.webp";
import img5 from "../img/5.png";
import img6 from "../img/6.png";
import img7 from "../img/7.png";
import img8 from "../img/8.webp";
import img9 from "../img/9.webp";
import img10 from "../img/10.webp";
import { fetchAchievements } from "../redux/achievements/operations";

const AchievementsPage: React.FC = () => {
  const { t } = useTranslation();
  const selectedTheme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const [completedAchievements, setCompletedAchievements] = useState<
    Achievement[]
  >([]);

  const achievementsData = [
    {
      id: 1,
      title: t("titl1e"),
      description: t("descriptio1n"),
      imgSrc: img1,
    },
    {
      id: 2,
      title: t("titl2e"),
      description: t("descriptio2n"),
      imgSrc: img2,
    },
    {
      id: 3,
      title: t("titl3e"),
      description: t("descriptio3n"),
      imgSrc: img3,
    },
    {
      id: 4,
      title: t("titl4e"),
      description: t("descriptio4n"),
      imgSrc: img4,
    },
    {
      id: 5,
      title: t("title5"),
      description: t("description5"),
      imgSrc: img5,
    },
    {
      id: 6,
      title: t("title6"),
      description: t("description6"),
      imgSrc: img6,
    },
    {
      id: 7,
      title: t("title7"),
      description: t("description7"),
      imgSrc: img7,
    },
    {
      id: 8,
      title: t("title8"),
      description: t("description8"),
      imgSrc: img8,
    },
    {
      id: 9,
      title: t("title9"),
      description: t("description9"),
      imgSrc: img9,
    },
    {
      id: 10,
      title: t("title10"),
      description: t("description10"),
      imgSrc: img10,
    },
  ];

  useEffect(() => {
    const fetchAchievementsData = async () => {
      try {
        const resultAction = await dispatch(fetchAchievements());

        if (fetchAchievements.fulfilled.match(resultAction)) {
          setCompletedAchievements(resultAction.payload);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAchievementsData();
  }, [dispatch]);

  const isAchievementCompleted = (achievementTitle: string) => {
    const completed = completedAchievements.some(
      (ach) => ach.title === achievementTitle
    );
    return completed;
  };
  return (
    <>
      <Helmet>
        <title>Achievements</title>
        <meta name="description" content="Achievements" />
      </Helmet>
      <div
        className={`container mx-auto pb-12 pt-40 ${
          selectedTheme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          {t("achievements")}
        </h1>
        <div className="grid grid-cols-1 gap-6">
          {achievementsData.map((achievement) => {
            const completed = isAchievementCompleted(achievement.title);

            return (
              <div
                key={achievement.id}
                className={`flex items-center p-6 rounded-lg shadow-md ${
                  selectedTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
                } ${completed ? "opacity-100" : "opacity-40"}`}
              >
                <img
                  src={achievement.imgSrc}
                  alt="Achievement Icon"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h2
                    className={`text-2xl font-bold ${
                      selectedTheme === "dark"
                        ? "text-gray-100"
                        : "text-gray-900"
                    }`}
                  >
                    {achievement.title}
                  </h2>
                  <p
                    className={`${
                      selectedTheme === "dark"
                        ? "text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {achievement.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AchievementsPage;
