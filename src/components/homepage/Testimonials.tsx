import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "../../redux/lang/selectors";
import { useAppSelector } from "../../redux/hooks";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { selectTheme } from "../../redux/theme/selectors";

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const selectedTheme = useAppSelector(selectTheme);

  const testimonialsData = [
    {
      author: t("author1"),
      text: t("text1"),
    },
    {
      author: t("author2"),
      text: t("text2"),
    },
    { author: t("author3"), text: t("text3") },
    { author: t("author4"), text: t("text4") },
    {
      author: t("author5"),
      text: t("text5"),
    },
  ];

  return (
    <section className="bg-none py-12">
      <h2
        className={`text-4xl font-bold text-center mb-8 ${
          selectedTheme === "dark" ? "text-gray-100" : "text-gray-800"
        }`}
      >
        {t("testimonials")}
      </h2>
      <div
        className={`w-84 mx-auto h-1 rounded-full mb-8 ${
          selectedTheme === "dark"
            ? "bg-gradient-to-r from-blue-500 to-blue-700"
            : "bg-gradient-to-r from-pink-500 to-yellow-700"
        }`}
      ></div>

      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        loop
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="pb-10"
      >
        {testimonialsData.map((testimonial, idx) => (
          <SwiperSlide key={idx}>
            <div
              className={`rounded-lg shadow-xl p-6 transition-transform transform hover:scale-105 max-w-md mx-auto h-[125px] flex flex-col justify-between ${
                selectedTheme === "dark"
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              <p className="text-lg mb-4 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <p
                className={`text-right text-sm ${
                  selectedTheme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                — {testimonial.author}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
