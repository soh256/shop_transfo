import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Categ } from "../../../routes/index";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import FeatureService from "../../../Services/Feature.service";
import { useSelector, useDispatch } from "react-redux";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import ThreeDots from "../../../components/loader/ThreeDots";

SwiperCore.use([Pagination, Autoplay]);

export const Navigation = () => {
  const categories = useSelector((state) => state.categories.data);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await FeatureService.All();
      setFeatures(data);
      setLoading(false);
    } catch ({ response }) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <LazyLoadComponent>
        <div className=" hidden lg:flex   w-full  h-64 overflow-hidden  justify-center items-center bg-gray-200  ">
          <div className=" w-2/3 flex h-56  justify-start  items-center  my-3    ">
            {/* {loading && <ThreeDots />} */}
            {!loading && (
              <div className=" hidden lg:flex w-3/12 h-52 text-gray-100  flex-col  shadow-md rounded   bg-yellow-500  py-1   items-center ">
                {categories.slice(0, 8).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/categorie/${cat.nom.toLowerCase()}`}
                    exact="false"
                    className="flex justify-between tracking-tighter items-center  text-xs hover:bg-yellow-200 xl:w-full hover:text-white hover:bg-opacity-50  hover:text-xl py-1 px-2  transition duration-200 ease-in-out  transform hover:-translate-y-1 hover:scale-y-100 uppercase "
                  >
                    {cat.nom}
                    <LazyLoadImage
                      effect="blur"
                      src={cat.image}
                      alt={cat.nom}
                      className="w-5 h-5"
                    />
                  </Link>
                ))}
              </div>
            )}

            <div className="w-9/12 h-52 rounded lg:ml-5 xl:ml-14 items-stretch">
              <div className="flex justify-center">
                {" "}
                {loading && <ThreeDots />}
              </div>

              {!loading && (
                <Swiper
                  slidesPerView={1}
                  slidesPerGroup={1}
                  loop={false}
                  loopFillGroupWithBlank={false}
                  autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: false,
                  }}
                  navigation={false}
                  // className="Nouveau"
                >
                  {features.map((feature) => {
                    if (feature.status && feature.show_header) {
                      return (
                        <div
                          key={feature.id}
                          className="w-full flex justify-start  rounded overflow-hidden"
                        >
                          <SwiperSlide>
                            <a href={feature.url} target="_blank">
                              <LazyLoadImage
                                src={feature.image}
                                effect="blur"
                                // height="323"
                                width="1150"
                                className="h-52 rounded "
                              />
                            </a>
                          </SwiperSlide>
                        </div>
                      );
                    }
                  })}
                </Swiper>
              )}
            </div>
          </div>
        </div>{" "}
        <div className="  lg:hidden   w-full  h-auto overflow-hidden  justify-center items-center bg-gray-200 z-0 ">
          <div className=" w-full h-41  justify-center  items-center  my-3 xl:space-x-3   ">
            <div className="h-48 flex  items-center w-full px-2  rounded">
              {loading && "Loading..."}
              {!loading && (
                <div className=" hidden lg:flex w-2/6 h-44 text-gray-100  flex-col  shadow-md rounded   bg-yellow-500  py-1  items-center ">
                  {categories.slice(0, 6).map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/categorie/${cat.nom.toLowerCase()}`}
                      exact="false"
                      className="flex justify-between  items-center  text-xs hover:bg-yellow-200 xl:w-32 hover:text-white hover:bg-opacity-50  hover:text-xl py-1  px-1 transition duration-200 ease-in-out  transform hover:-translate-y-1 hover:scale-y-100 uppercase "
                    >
                      {cat.nom}
                      <LazyLoadImage
                        src={cat.image}
                        effect="blur"
                        alt={cat.nom}
                        className="w-5 h-5"
                      />
                    </Link>
                  ))}
                </div>
              )}

              <div className="w-full h-auto rounded xl:ml-7 2xl:ml-14 items-stretch">
                {loading && "Loading..."}
                {!loading && (
                  <Swiper
                    slidesPerView={1}
                    slidesPerGroup={1}
                    loop={false}
                    loopFillGroupWithBlank={false}
                    autoplay={{
                      delay: 7000,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: false,
                    }}
                    navigation={false}
                    // className="Nouveau"
                  >
                    {features.map((feature) => {
                      if (feature.status && feature.show_header) {
                        return (
                          <div
                            key={feature.id}
                            className="w-full flex justify-start  rounded static"
                          >
                            <SwiperSlide>
                              <a href={feature.url} target="_blank">
                                <LazyLoadImage
                                  src={feature.image}
                                  effect="blur"
                                  // height="323"
                                  width="1150"
                                  className="h-44 rounded"
                                />
                              </a>
                            </SwiperSlide>
                          </div>
                        );
                      }
                    })}
                  </Swiper>
                )}
              </div>
            </div>
          </div>
        </div>
      </LazyLoadComponent>
    </>
  );
};
