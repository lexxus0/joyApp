import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "../../redux/lang/slice";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials: React.FC = () => {
  const { t } = useTranslation();

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
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-100">
        {t("testimonials")}
      </h2>
      <div className="w-84 mx-auto h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-8"></div>

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
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 hover:bg-gray-700 transition-transform transform hover:scale-105 max-w-md mx-auto text-white h-[125px] flex flex-col justify-between">
              <p className="text-lg mb-4 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <p className="text-right text-gray-400 text-sm">
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
