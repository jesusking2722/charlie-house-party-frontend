import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import "./style.css";
import { EffectCards } from "swiper/modules";
import {FC, useState} from "react";
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
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
      <div className='flex flex-col gap-4 w-full'>
    <div className="relative w-full h-[500px]">
      <Swiper
          style={{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
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
    <div className="relative w-full h-[150px]">
        <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <img
                        src={slide.imgSource}
                        alt={slide.title}
                        className="absolute w-full h-full top-0 left-0 object-cover shadow-md cursor-pointer"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
      </div>
  );
};

export default CardEffectSlider;
