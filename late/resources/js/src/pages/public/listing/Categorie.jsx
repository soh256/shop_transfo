import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { ModelView } from "../../../components/public/ModelProduct/ModelView";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { Rating, Disclosure } from "../../../components/public";
import ThreeDots from "../../../components/loader/ThreeDots";

const StarRatings = [
  {
    stars: 5,
  },
  {
    stars: 4,
  },
  {
    stars: 3,
  },

  {
    stars: 2,
  },
  {
    stars: 1,
  },
];

export const Categorie = () => {
  const products = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);
  // debut filtre
  // const [value, setValue] = React.useState("1");
  const [value, setValue] = React.useState([0, 100000000]);
  //   const [pageNumber, setPageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [passingTags, setPassingTags] = useState({
    // category: {},
    marque: {},
    note: {},
  });

  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);

  const { title } = useParams();

  const allFilterClickListener = (e, filterProp) => {
    const name = e.target.dataset.name;
    setPassingTags({
      ...passingTags,
      [filterProp]: {
        ...passingTags[filterProp],
        [name.toLowerCase().replaceAll(" ", "")]:
          !passingTags[filterProp][name.toLowerCase().replaceAll(" ", "")],
      },
    });
  };

  //collecter les valeurs de filtrage
  const filteredCollected = () => {
    const collectedTrueKeys = {
      note: [],
      marque: [],
    };

    const { note, marque } = passingTags;
    for (let ratingKey in note) {
      if (note[ratingKey]) collectedTrueKeys.note.push(parseInt(ratingKey));
    }

    for (let brandKey in marque) {
      if (marque[brandKey]) collectedTrueKeys.marque.push(brandKey);
    }
    // for (let categoryKey in category) {
    //     if (category[categoryKey])
    //         collectedTrueKeys.category.push(categoryKey);
    // }
    return collectedTrueKeys;
  };

  const multiPropsFilter = (products, filters) => {
    const filterKeys = Object.keys(filters);
    return products.filter((product) => {
      return filterKeys.every((key) => {
        if (!filters[key].length) return true;
        // Loops again if product[key] is an array (for material attribute).
        if (Array.isArray(product[key])) {
          return product[key].some((keyEle) => filters[key].includes(keyEle));
        }
        return filters[key].includes(
          key === "note"
            ? product[key]
            : product[key].toLowerCase().replaceAll(" ", "")
        );
      });
    });
  };

  const priceFilter = () => {
    const data = multiPropsFilter(
      products.filter((item) => item.category === title),
      filteredCollected()
    );
    return data.filter(
      (item) => item.prix >= value[0] && item.prix <= value[1]
    );
  };

  // console.log(filteredCollected());

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue([e.target[0].value, e.target[1].value]);
  };

  //   const dataPerpage = 9;
  //   const pageVisited = pageNumber * dataPerpage;
  //   const pageCount = Math.ceil(priceFilter().length / dataPerpage);

  const perPage = 9;
  const viewData = currentPage * perPage;
  const pageCount = Math.ceil(priceFilter()?.length / perPage);
  const sliceData = priceFilter()?.slice(viewData, viewData + perPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const resetFilter = () => {
    setPassingTags({
      marque: {},
      note: {},
    });
    maxInputRef.current.value = "";
    minInputRef.current.value = "";
    setValue([0, 100000000]);
  };
  useEffect(() => {
    resetFilter();
  }, [title]);

  const enabled = value.length > 0;
  return (
    <div className=" bg-gray-300  w-full h-auto  ">
      <div className="bg-gray-300 h-12 lg:h-16 flex items-center justify-center  lg:mt-0">
        <div className="w-2/3 flex ">
          <label className=" text-sm lg:text-2xl font-semibold text-gray-600 uppercase">
            {title}
          </label>
        </div>
      </div>
      <div className=" bg-white flex justify-center items-center">
        <div className="hidden lg:flex w-2/3  my-10">
          {/* filtre */}
          <div className="w-2/5 z-0 bg-white p-4 mr-20 h-auto rounded  border-2 border-gray-200">
            <div className="flex justify-between items-center border-b pb-4 border-gray-200">
              <p className="text-sm text-gray-500 capitalize">affiner par</p>
              <button
                onClick={() => resetFilter()}
                className="text-sm text-gray-500 capitalize focus:outline-none"
              >
                clean all
              </button>
            </div>
            <Disclosure title="prix">
              <form onSubmit={handleSubmit} className="flex justify-around">
                <input
                  ref={minInputRef}
                  name="min"
                  placeholder="Min"
                  className="w-full h-8  rounded flex justify-center items-center border border-blue-500 text-center text-xs focus-visible:border-2 focus-visible:border-blue-700 focus:outline-none"
                />
                <span className="mx-2">-</span>
                <input
                  ref={maxInputRef}
                  name="max"
                  placeholder="Max"
                  className="w-full h-8 rounded flex justify-center items-center border border-blue-500 text-center text-xs  focus-visible:border-2 focus-visible:border-blue-700 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!enabled}
                  className="ml-2 p-2 flex justify-center items-center border bg-blue-500 rounded shadow-sm hover:bg-blue-600 transition-colors ease-in-out duration-200 w-8 h-8 focus:outline-none text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </form>
            </Disclosure>
            <Disclosure title="Marques">
              {!loading &&
                Array.from(
                  new Set(
                    products
                      .filter((item) => item.category === title)
                      .map((item) => item.marque)
                  )
                ).map((item, i) => (
                  <div className="form-check ml-2" key={i}>
                    <label
                      className="form-check-label inline-block text-gray-800 cursor-pointer text-sm capitalize"
                      for={`flexCheckDefault${item.id}`}
                    >
                      {item.toString().toLowerCase()}
                    </label>
                    <input
                      data-name={item}
                      onChange={(e) => allFilterClickListener(e, "marque")}
                      className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-md bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="checkbox"
                      id={`flexCheckDefault${item.id}`}
                      checked={
                        passingTags.marque[
                          item.toLowerCase().replaceAll(" ", "")
                        ] === true
                      }
                    />
                  </div>
                ))}
            </Disclosure>
            <Disclosure title="Ratings" childrenStyle="space-y-2">
              {StarRatings.map((rating, i) => (
                <div key={i} className="flex justify-between">
                  <Rating value={rating.stars} />
                  <input
                    data-name={rating.stars}
                    onChange={(e) => allFilterClickListener(e, "note")}
                    className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-md bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                    checked={passingTags.note[rating.stars] === true}
                  />
                </div>
              ))}
            </Disclosure>
          </div>
          {/* fin filtre */}
          <div className="w-5/6 ">
            {/* table de données */}
            {loading && (
              <div className="text-blue-500 h-full flex items-center justify-center">
                <>
                  <ThreeDots />
                </>
              </div>
            )}
            {!loading && priceFilter().length > 0 && (
              <div className="grid grid-flow-row grid-cols-3 grid-rows-auto gap-3 mb-5 h-screen">
                {priceFilter()
                  .slice(viewData, viewData + perPage)
                  .map((data) => {
                    return <ModelView key={data.id} product={data} />;
                  })}
              </div>
            )}
            {!loading && priceFilter().length <= 0 && (
              <div className="text-blue-500 h-full flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                No data
              </div>
            )}
            <div className="flex justify-end pt-5 ">
              {pageCount > 1 && (
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={1}
                  onPageChange={changePage}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              )}
            </div>
            {/* fin de table */}
          </div>
        </div>
        {/* MobileMenu */}
        <div className=" flex  w-full lg:hidden justify-center  ">
          <div className=" flex flex-col justify-center">
            <div className=" w-full flex  justify-center mb-4">
              <div className=" w-3/5  ">
                <div className="flex justify-between items-center border-b pb-4 border-gray-200">
                  <p className="text-sm text-gray-500 capitalize">
                    affiner par
                  </p>
                  <button
                    onClick={() => resetFilter()}
                    className="text-sm text-gray-500 capitalize focus:outline-none"
                  >
                    clean all
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="flex justify-around">
                  <input
                    name="min"
                    placeholder="Min"
                    className="w-full h-8  rounded flex justify-center items-center border border-blue-500 text-center text-xs focus-visible:border-2 focus-visible:border-blue-700 focus:outline-none"
                  />
                  <span className="mx-2">-</span>
                  <input
                    name="max"
                    placeholder="Max"
                    className="w-full h-8 rounded flex justify-center items-center border border-blue-500 text-center text-xs  focus-visible:border-2 focus-visible:border-blue-700 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!enabled}
                    className="ml-2 p-2 flex justify-center items-center border bg-blue-500 rounded shadow-sm hover:bg-blue-600 transition-colors ease-in-out duration-200 w-8 h-8 focus:outline-none text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </form>
              </div>
              {/* <>
                             <Disclosure
                                    title="Ratings"
                                    childrenStyle="space-y-2"
                                >
                                    {StarRatings.map((rating, i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between"
                                        >
                                            <Rating value={rating.stars} />
                                            <input
                                                data-name={rating.stars}
                                                onChange={(e) =>
                                                    allFilterClickListener(
                                                        e,
                                                        "note"
                                                    )
                                                }
                                                className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-md bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="checkbox"
                                                checked={
                                                    passingTags.note[
                                                        rating.stars
                                                    ] === true
                                                }
                                            />
                                        </div>
                                    ))}
                                </Disclosure>
                            </> */}
            </div>

            <div className="w-full flex flex-col justify-center items-end ">
              {/* table de données */}
              {loading && "Loading..."}
              {!loading && priceFilter().length > 0 ? (
                <div className="grid grid-flow-row grid-cols-2 grid-rows-auto gap-2 mb-5">
                  {priceFilter()
                    .slice(viewData, viewData + perPage)
                    .map((data) => {
                      return <ModelView key={data.id} product={data} />;
                    })}
                </div>
              ) : (
                "No data"
              )}
              {pageCount > 1 && (
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={1}
                  onPageChange={changePage}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              )}
              {/* fin de table */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
