import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
// import GettingAllCategroy from "./GettingAllCategroy";
import { useSearchParams } from "react-router-dom";
// import Loader from "./sub-components/Loader";
import { ReactSession } from "react-client-session";
// import Category from "./sub-components/Category";
import NoItemFound from "./sub-components/NoItemFound.jsx";

const CompanyIndividualResult = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("Category");
  const brand = searchParams.get("brand[]");
  const minprice = searchParams.get("minprice");
  const maxprice = searchParams.get("maxprice");
  const [getUserData, setUserData] = useState([[1]]);
  console.log(brand);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([1]);
  let link = "hello";

  useEffect(() => {
    if (name && brand && minprice && maxprice) {
      link = `http://localhost:5000/skcart__allproduct_by_category?Category=${name}&&Sub_categroy=${brand}&&minprice=${minprice}&&maxprice=${maxprice}`;
    } else if (name && brand && !(minprice && maxprice)) {
      link = `http://localhost:5000/skcart__allproduct_by_category?Category=${name}&&Sub_categroy=${brand}`;
    } else if (name && minprice && maxprice && !brand) {
      link = `http://localhost:5000/skcart__allproduct_by_category?Category=${name}&&minprice=${minprice}&&maxprice=${maxprice}
      )}`;
    } else if (brand && minprice && maxprice && !name) {
      link = `http://localhost:5000/skcart__allproduct_by_category?Sub_categroy=${brand}&&minprice=${minprice}&&maxprice=${maxprice}`;
    } else if (name && !(minprice && maxprice && brand)) {
      link = `http://localhost:5000/skcart__allproduct_by_category?Category=${name}`;
    } else if (brand && !(name && minprice && maxprice)) {
      link = `http://localhost:5000/skcart__allproduct_by_category?Sub_categroy=${brand}`;
    } else if (minprice && maxprice && !(name && brand)) {
      link = `http://localhost:5000/skcart__allproduct_by_category?minprice=${minprice}&&maxprice=${maxprice}`;
    } else {
      window.location.href = "/";
    }
    if (link !== "") {
      // //Fethcing all individual product name
      fetch(link, {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.length !== 0) {
              setData(result);
            }
          },
          (error) => {}
        );

      // //Fethcing Particular Categroy Brand
      if (name) {
        fetch(
          `http://localhost:5000/skcart_particular_category?Category=${name}`,
          {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((res) => res.json())
          .then(
            (result) => {
              if (result.length !== 0) {
                console.log(result);
                setFilterData(result);
              }
            },
            (error) => {}
          );
      }

      if (ReactSession.get("username") !== "") {
        fetch(
          `http://localhost:5000/userInfo/${ReactSession.get("username")}`,
          {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((res) => res.json())
          .then(
            (result) => {
              setUserData(result[0].cartitems);
            },
            (error) => {}
          );
      }
    }
  }, []);

  console.log(link);
  if (link == "") {
    window.location.href = "/";
  }

  return link !== "" ? (
    <div className="home-page main-div">
      <div className="smartphones">
        <div className="filter-smartphones">
          <form method="get" enctype="multipart/form-data">
            {name && (
              <ul>
                <p>
                  <b>Category : </b>
                </p>
                <li>
                  <input
                    text=""
                    name="Category"
                    value={name}
                    readOnly
                    style={{ letterSpacing: "2px", textTransform: "uppercase" }}
                  />
                </li>
              </ul>
            )}
            <ul>
              {filterData[0] !== 1 && (
                <p>
                  <b>Brand : </b>
                </p>
              )}

              {filterData[0] !== 1 &&
                filterData[0].Sub_category.map((element, index) => {
                  return (
                    <li>
                      <input type="radio" value={element.name} name="brand[]" />
                      <small>{element.name}</small>
                    </li>
                  );
                })}
            </ul>

            <p>
              <b>Price Range :</b>
            </p>
            <div className="price-range">
              <select name="minprice">
                <option selected={true} value="0">
                  Min Price
                </option>
                <option value="10000">10000</option>
                <option value="20000">20000</option>
                <option value="30000">30000</option>
                <option value="35000">above 30000</option>
              </select>
              <p> to </p>
              <select name="maxprice">
                <option selected={true} value="200000">
                  Max Price
                </option>
                <option value="10000">10000</option>
                <option value="20000">20000</option>
                <option value="30000">30000</option>
                <option value="200000">above 30000</option>
              </select>
            </div>
            <button type="submit">Apply Filter</button>
          </form>
        </div>
        <div className="smartphones-result">
          {data[0] !== 1 ? (
            data.map((element, index) => {
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
            })
          ) : (
            <NoItemFound />
          )}
        </div>
      </div>
    </div>
  ) : (
    (window.location.href = "/")
  );
};

export default CompanyIndividualResult;
