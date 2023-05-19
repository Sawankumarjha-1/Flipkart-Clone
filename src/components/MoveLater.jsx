import React from "react";
import google from "../assets/google7.jpg";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const MoveLater = () => {
  return (
    <div className="add-to-cart-items">
      <h3 style={{ padding: "10px 20px" }}>Save For Later</h3>
      <div className="individual-cart-item">
        <div className="individual-cart-item-left">
          <img src={google} alt="item" />
        </div>
        <div className="individual-cart-item-middle">
          <h3>Google Pixel 7 Pro (Hazel, 128 GB)</h3>
          <small>12 GB RAM</small>

          <h2>₹ 84,999</h2>
          <small> ₹69 Secured Packaging Fee</small>
        </div>

        <div className="save-later">
          <div className="quantity">
            <AiOutlineMinus size={25} className="increment" />
            <input type="text" />
            <AiOutlinePlus size={25} className="increment" />
          </div>
          <button>Move To Cart</button>
          <button>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default MoveLater;
