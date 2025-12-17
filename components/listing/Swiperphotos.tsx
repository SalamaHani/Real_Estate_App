import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";


function Swiperphotos({ photos }: { photos: string[] | null }) {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {photos?.map((img, i) => (
        <SwiperSlide key={i} className="relative">
          <Image
            src={img}
            alt={img ?? "non"}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Swiperphotos;
