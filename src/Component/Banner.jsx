import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Banner = () => {
  const slides = [
    { image: "https://i.ibb.co/wNf1wmLG/1.jpg" },
    { image: "https://i.ibb.co/Kp15v8wv/3.webp" },
    { image: "https://i.ibb.co/wTDsQpr/2.jpg" },
    { image: "https://i.ibb.co/BKFzzVFy/6.jpg" },
    { image: "https://i.ibb.co/CpQH0jsg/5.jpg" },
  ];

  return (
    <div className="w-full">
      <Swiper spaceBetween={30} loop={true} autoplay>
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[250px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
