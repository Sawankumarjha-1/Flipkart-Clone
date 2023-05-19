import React from "react";
import loaderImg from "../../assets/favicon.png";
const Loader = () => {
  return (
    <div className="loader-main-div">
      <div className="loader_animation">
        <img src={loaderImg} alt="Loading" />
      </div>
    </div>
  );
};

export default Loader;
