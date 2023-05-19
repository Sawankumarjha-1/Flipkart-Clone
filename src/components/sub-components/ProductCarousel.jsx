import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { AiFillCheckCircle } from "react-icons/ai";

const ProductCarousel = (props) => {
  const [smartphoneData, setSmartphoneData] = useState([]);
  const [getUserData, setUserData] = useState([]);
  useEffect(() => {
    //Fethcing Offer Data
    fetch(`http://localhost:5000/skcart_products/${props.type}/6`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setSmartphoneData(result);
        },

        (error) => {}
      );

    // Fetching the user data if login
    if (ReactSession.get("username") !== "") {
      fetch(`http://localhost:5000/userInfo/${ReactSession.get("username")}`, {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setUserData(result[0].cartitems);
          },

          (error) => {}
        );
    }
  }, []);

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
          <AiFillCheckCircle size={20} />
        </button>
      );
    } else {
      return (
        <Link
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
          className="items-btn-two"
        >
          ADD
        </Link>
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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={false}
      responsive={responsive}
      containerClass="carousel-container"
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      className="carousel-items"
      itemClass="carousel-item-padding-40-px"
    >
      {smartphoneData.map((element, index) => {
        return (
          <section className="individual-item" key={"smartphones" + index}>
            <div className="indiviudal-item-img-div">
              <img src={element.main_img} alt="Not Found" />
            </div>
            <p>
              <Link
                to={"/individualsearchitem?_id=" + element._id}
                target="_blank"
              >
                {element.sub_name}{" "}
              </Link>
              <span>{element.Rating}🌟</span>
            </p>
            <small>{element.Color}</small>
            <h3>{element.price}</h3>
            <div className="items-btn">
              <Link
                to="/"
                className="items-btn-one"
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
                Buy
              </Link>
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
                <Link
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
                  className="items-btn-two"
                >
                  ADD
                </Link>
              )}
            </div>
          </section>
        );
      })}
    </Carousel>
  );
};

export default ProductCarousel;
