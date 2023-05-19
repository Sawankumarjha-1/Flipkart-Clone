import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";

import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import GettingAllCategroy from "./GettingAllCategroy";
import Loader from "./sub-components/Loader";
import { useSearchParams } from "react-router-dom";
import NoItemFound from "./sub-components/NoItemFound";

const Result = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name"); // ▶ URLSearchParams {

  const [data, setData] = useState([]);

  useEffect(() => {
    //Fethcing all individual product name
    fetch(
      `http://localhost:5000/skcart_products/allproducts?sub_name=${name}`,
      {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);
          setData(result);
        },

        (error) => {}
      );
  }, []);

  return data ? (
    <div className="home-page main-div">
      <GettingAllCategroy />
      {data.length === 0 ? (
        <NoItemFound />
      ) : (
        <div className="smartphones">
          <div className="smartphones-result">
            {data.map((element, index) => {
              return (
                <Link
                  to={"/individualsearchitem?_id=" + element._id}
                  target="_blank"
                  key={"individual-search-item" + index}
                >
                  <div className="individual-smartphone-result">
                    <div className="individual-smartpohone-result-left">
                      <div className="img">
                        <img src={element.main_img} alt="" />
                      </div>
                      <div className="result-content">
                        <h2>{element.name.substr(0, 70) + "..."}</h2>
                        <span>
                          <b>{element.Rating}🌟</b>
                        </span>
                        <ul>
                          <li
                            style={{
                              listStyleType: element.Highlights.feature_1
                                ? "circle"
                                : "none",
                            }}
                          >
                            {element.Highlights.feature_1 &&
                              element.Highlights.feature_1}
                          </li>
                          <li
                            style={{
                              listStyleType: element.Highlights.feature_2
                                ? "circle"
                                : "none",
                            }}
                          >
                            {element.Highlights.feature_2 &&
                              element.Highlights.feature_2}
                          </li>
                          <li
                            style={{
                              listStyleType: element.Highlights.feature_3
                                ? "circle"
                                : "none",
                            }}
                          >
                            {element.Highlights.feature_3 &&
                              element.Highlights.feature_3}
                          </li>
                          <li
                            style={{
                              listStyleType: element.Highlights.feature_4
                                ? "circle"
                                : "none",
                            }}
                          >
                            {element.Highlights.feature_4 &&
                              element.Highlights.feature_4}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="individual-smartpohone-result-right">
                      <h2>{element.Price + "/-"}</h2>
                      <span>
                        <small>{element.cutprice && element.cutprice}</small>
                      </span>
                      <b className="discount">
                        {element.actualcutprice &&
                          element.actualprice &&
                          100 -
                            parseInt(
                              (element.actualprice * 100) /
                                element.actualcutprice
                            )}
                        % off
                      </b>
                      <small className="free-delivery">Free Delivery</small>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default Result;
