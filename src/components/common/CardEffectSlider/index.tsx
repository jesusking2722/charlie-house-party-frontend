import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "./style.css";
import { EffectCards } from "swiper/modules";
import { FC } from "react";
import Button from "../Button";

export type CardEffectSliderItemType = {
  title: string;
  subtitle: string;
  imgSource: string;
};

interface CardEffectSliderProps {
  slides: CardEffectSliderItemType[];
}

const CardEffectSlider: FC<CardEffectSliderProps> = ({ slides }) => {
  return (
    <div className="relative w-full h-[500px]">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="card-effect-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide.imgSource}
              alt={slide.title}
              className="absolute w-full h-full top-0 left-0 object-cover rounded-xl shadow-lg"
            />
            <div className="absolute bottom-10 left-16">
              <h1 className="text-white text-4xl font-semibold">
                {slide.title}
              </h1>
              <h2 className="text-white text-xl font-semibold mb-4">
                {slide.subtitle}
              </h2>
              <Button type="transparent" label="Read more" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardEffectSlider;
