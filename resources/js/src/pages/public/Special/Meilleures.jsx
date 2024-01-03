import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Swiper.css";
import { ModelView } from "../../../components/public/ModelProduct/ModelView";
import { useSelector } from "react-redux";

import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
SwiperCore.use([Pagination, Navigation, Autoplay]);

export const Meilleures = () => {
  const products = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);

  return (
    <>
      <div className=" hidden lg:flex h-full w-full ">
        {loading && "Loading..."}
        {!loading && (
          <Swiper
            slidesPerView={4}
            slidesPerGroup={1}
            loop={false}
            loopFillGroupWithBlank={false}
            autoplay={{ delay: 2500, disableOnInteraction: true }}
            pagination={{
              clickable: false,
            }}
            navigation={false}
            className="swiper-slide"
          >
            {products.slice(0, 20).map((product) => (
              <SwiperSlide key={product.id}>
                <ModelView product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>{" "}
      <div className="  lg:hidden h-full w-full z-0 relative">
        {loading && "Loading..."}
        {!loading && (
          <Swiper
            slidesPerView={2}
            slidesPerGroup={1}
            loop={false}
            loopFillGroupWithBlank={false}
            autoplay={{ delay: 1500, disableOnInteraction: true }}
            pagination={{
              clickable: false,
            }}
            navigation={false}
            className="swiper-slide"
          >
            {products.slice(0, 20).map((product) => (
              <SwiperSlide key={product.id}>
                <ModelView product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};
