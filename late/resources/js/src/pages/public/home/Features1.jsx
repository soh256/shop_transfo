import React, { useState, useEffect } from "react";
import { image } from "..";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import FeatureService from "../../../Services/Feature.service";
import ThreeDots from "../../../components/loader/ThreeDots";
SwiperCore.use([Pagination, Autoplay]);

export const Features1 = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await FeatureService.All();
      setFeatures(data);
      setLoading(false);
    } catch ({ response }) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center">
      {loading && <ThreeDots />}
      {!loading && (
        <>
          <div className=" hidden lg:flex  w-2/3 mt-2 py-2  h-auto md:mt-2  justify-center items-center ">
            <div className=" w-full">
              <Swiper
                slidesPerView={1}
                // direction={}
                slidesPerGroup={1}
                loop={false}
                loopFillGroupWithBlank={false}
                autoplay={{
                  delay: 7000,
                  disableOnInteraction: true,
                }}
                pagination={{
                  clickable: false,
                }}
                navigation={false}
                className="Nouveau"
              >
                <div className=" w-full mt-2 md:mt-2 xl:mt-0  flex justify-center items-center static">
                  {features.map((feature) => {
                    if (feature.status && !feature.show_header) {
                      return (
                        <SwiperSlide key={feature.id}>
                          <img
                            src={feature.image}
                            className="h-44 w-full rounded static"
                          />
                        </SwiperSlide>
                      );
                    }
                  })}
                </div>
              </Swiper>
            </div>
          </div>
          <div className=" flex lg:hidden  w-full  px-1 h-auto md:mt-2  justify-center items-center z-0 relative">
            <div className=" w-full">
              <Swiper
                slidesPerView={1}
                // direction={}
                slidesPerGroup={1}
                loop={false}
                loopFillGroupWithBlank={false}
                autoplay={{
                  delay: 7000,
                  disableOnInteraction: true,
                }}
                pagination={{
                  clickable: false,
                }}
                navigation={false}
                // className="Nouveau"
              >
                <div className=" w-full mt-2 md:mt-2 xl:mt-0  flex justify-center items-center">
                  {features.map((feature) => {
                    if (feature.status && !feature.show_header) {
                      return (
                        <SwiperSlide key={feature.id}>
                          <img
                            src={feature.image}
                            className="h-44 w-full rounded"
                          />
                        </SwiperSlide>
                      );
                    }
                  })}
                </div>
              </Swiper>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
