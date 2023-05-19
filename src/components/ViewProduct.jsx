import React, { useEffect, useState } from "react";
import { SlEnergy } from "react-icons/sl";
import { BsCartPlus } from "react-icons/bs";
import { AiFillStar, AiFillCheckCircle } from "react-icons/ai";
import ProductCarousel from "./sub-components/ProductCarousel";
import { useSearchParams } from "react-router-dom";
import Loader from "./sub-components/Loader";
import { ReactSession } from "react-client-session";
// import { FaSleigh } from "react-icons/fa";
const ViewProduct = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("_id");
  const [data, setData] = useState([]);
  const [clickImg, setClickImg] = useState("");
  const [getUserData, setUserData] = useState([]);

  useEffect(() => {
    //Fethcing all individual product name
    if (id) {
      fetch(
        `http://localhost:5000/skcart_products/individualproduct?_id=${id}`,
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
              setClickImg(result[0].main_img);
              setData(result);
            } else {
            }
          },

          (error) => {}
        );

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
  if (id) {
    //Checking that which items is already add into cartitem
    function itemPresent(
      _id,
      name,
      Rating,
      Price,
      Warranty,
      Highlights,
      Color,
      Images,
      Category,
      Sub_categroy,
      sub_name,
      main_img,
      actualcutprice,
      actualprice,
      cutprice
    ) {
      let checkcartitem = false;

      for (let i = 0; i < getUserData.length; i++) {
        if (getUserData[i]._id === _id) {
          checkcartitem = true;
        }
      }
      if (checkcartitem === true) {
        return (
          <button disabled>
            <AiFillCheckCircle size={30} />
          </button>
        );
      } else {
        return (
          <button
            id="view-btn1"
            onClick={() => {
              Cart(
                _id,
                name,
                Rating,
                Price,
                Warranty,
                Highlights,
                Color,
                Images,
                Category,
                Sub_categroy,
                sub_name,
                main_img,
                actualcutprice,
                actualprice,
                cutprice
              );
            }}
          >
            <BsCartPlus size={20} className="btn-icons" />
            Add To Cart
          </button>
        );
      }
    }

    // Add to cart on click
    function Cart(
      _id,
      name,
      Rating,
      Price,
      Warranty,
      Highlights,
      Color,
      Images,
      Category,
      Sub_categroy,
      sub_name,
      main_img,
      actualcutprice,
      actualprice,
      cutprice
    ) {
      if (ReactSession.get("username") !== "") {
        fetch(
          `http://localhost:5000/skcart_postcartitem?email=${ReactSession.get(
            "username"
          )}`,
          {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cartitems: {
                _id: _id,
                name: name,
                Rating: Rating,
                Price: Price,
                Warranty: Warranty,
                Highlights: Highlights,
                Images: Images,
                Color: Color,
                Category: Category,
                Sub_categroy: Sub_categroy,
                sub_name: sub_name,
                main_img: main_img,
                actualprice: actualprice,
                cutprice: cutprice,
                actualcutprice: actualcutprice,
              },
            }),
          }
        ).then((res) => {});
      }

      window.location = "/cart";
    }

    return data.length && clickImg ? (
      <div className="main-div ">
        {data.map((element, index) => {
          return (
            <div className="view-product" key={"individual-item-view" + index}>
              <div className="view-item-images">
                <div className="view-item-images-carousel">
                  {element.Images.length && (
                    <div className="view-item-images-carousel-options">
                      {element.Images.map((element, index) => {
                        return (
                          <div
                            key={"individual-click-images-item-view" + index}
                            onClick={() => {
                              setClickImg(element);
                            }}
                          >
                            <img src={element} alt="Product" />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div
                    className="view-item-images-show"
                    style={{
                      width: element.Images.length ? "100%" : "70%",
                      justifyContent: "center",
                    }}
                  >
                    <img src={clickImg} alt="Product" />
                  </div>
                </div>
                <div className="view-images-action">
                  {ReactSession.get("username") !== "" ? (
                    itemPresent(
                      element._id,
                      element.name,
                      element.Rating,
                      element.Price,
                      element.Warranty,
                      element.Highlights,
                      element.Color,
                      element.Images,
                      element.Category,
                      element.Sub_categroy,
                      element.sub_name,
                      element.main_img,
                      element.actualcutprice,
                      element.actualprice,
                      element.cutprice
                    )
                  ) : (
                    <button
                      id="view-btn1"
                      onClick={() => {
                        Cart(
                          element._id,
                          element.name,
                          element.Rating,
                          element.Price,
                          element.Warranty,
                          element.Highlights,
                          element.Color,
                          element.Images,
                          element.Category,
                          element.Sub_categroy,
                          element.sub_name,
                          element.main_img
                        );
                      }}
                    >
                      <BsCartPlus size={20} className="btn-icons" />
                      Add To Cart
                    </button>
                  )}
                  <button
                    id="view-btn2"
                    onClick={() => {
                      Cart(
                        element._id,
                        element.name,
                        element.Rating,
                        element.Price,
                        element.Warranty,
                        element.Highlights,
                        element.Color,
                        element.Images,
                        element.Category,
                        element.Sub_categroy,
                        element.sub_name,
                        element.main_img,
                        element.actualcutprice,
                        element.actualprice,
                        element.cutprice
                      );
                    }}
                  >
                    <SlEnergy size={20} className="btn-icons" />
                    Order Now
                  </button>
                </div>
              </div>
              <div className="view-item-features">
                <div className="brand-specs">
                  <h3>{element.name}</h3>
                  <small className="rating-features">
                    <span>
                      {element.Rating}
                      <AiFillStar />
                    </span>
                  </small>
                  <h2>
                    {element.Price + "/-"}
                    <small>{element.cutprice && element.cutprice} </small>
                  </h2>
                  <small>
                    {element.actualcutprice &&
                      element.actualprice &&
                      100 -
                        parseInt(
                          (element.actualprice * 100) / element.actualcutprice
                        )}
                    % off
                  </small>
                </div>
                <div className="features-highlight">
                  <b>Warranty</b>
                  <small>{element.Warranty}</small>
                  <b>Highlight</b>
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
                <div className="feedback">
                  <h3>Review & Ratings</h3>
                  {element.feedback.length ? (
                    element.feedback.map((e, i) => {
                      return (
                        <div className="individual-feedback">
                          <b>
                            {e.name}
                            <span>
                              {e.rating}
                              <AiFillStar />
                            </span>
                          </b>

                          <small>{e.review}</small>
                        </div>
                      );
                    })
                  ) : (
                    <small>No Review & Rating</small>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <ProductCarousel type={data[0].Category} />
      </div>
    ) : (
      <Loader />
    );
  } else {
    return (window.location = "/");
  }
};

export default ViewProduct;
