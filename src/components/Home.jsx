import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import { Link } from "react-router-dom";
import Heading from "./sub-components/Heading";
import "react-multi-carousel/lib/styles.css";
import ProductCarousel from "./sub-components/ProductCarousel";
import Loader from "./sub-components/Loader";
import GettingAllCategroy from "./GettingAllCategroy";

const Home = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [offerData, setOfferData] = useState([]);

  useEffect(() => {
    //Fethcing Carousel Data
    fetch(`http://localhost:5000/allcarouselitem`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setCarouselData(result);
        },

        (error) => {}
      );
    //Fethcing Offer Data
    fetch(`http://localhost:5000/alloffers`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setOfferData(result);
        },

        (error) => {}
      );
  }, []);

  return carouselData ? (
    <div className="home-page main-div">
      <GettingAllCategroy />
      <Carousel
        width="100%"
        className="carousel"
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={2000}
      >
        {carouselData.map((element, index) => {
          return (
            <div
              className="carousel-individuals"
              key={"skcart_carousel_indiviudal_item" + index}
            >
              <div className="carousel-img">
                <img src={element.image} alt="carousel-img" />
              </div>
              <div className="carousel-content">
                <h1>{element.item_name}</h1>
                <p>{element.about}</p>
                <Link
                  to={"/individualsearchitem?_id=" + element.reference_id}
                  target="_blank"
                >
                  Explore Now
                </Link>
              </div>
            </div>
          );
        })}
      </Carousel>

      <div className="offers">
        {offerData.map((element, index) => {
          return (
            <div className="individual-offer" key={"individual-offer" + index}>
              <b>{element.title}</b>
              <Link to={element.link}>Explore</Link>
            </div>
          );
        })}
      </div>
      <Heading text="Smartphones" />
      <ProductCarousel type="Smartphones" />
      <Heading text="Laptops" />
      <ProductCarousel type="Laptops" />
      <Heading text="Appliances" />
      <ProductCarousel type="Appliances" />
      <Heading text="Fashions" />
      <ProductCarousel type="Fashions" />
    </div>
  ) : (
    <Loader />
  );
};

export default Home;
