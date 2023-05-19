import React, { useState, useEffect } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { ReactSession } from "react-client-session";
import Loader from "./sub-components/Loader";
import { useSearchParams } from "react-router-dom";
import NoItemFound from "./sub-components/NoItemFound";
function OrderStatus() {
  const [actualData, setActualData] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("_id");
  const index = searchParams.get("presentat");
  const [feedback, setFeedback] = useState({
    name: ReactSession.get("name"),
    username: ReactSession.get("username"),
    rating: 5,
    review: "Nice packaging and good product",
  });

  useEffect(() => {
    if (ReactSession.get("username") !== "") {
      fetch(
        `http://localhost:5000/orderuserinfo?email=${ReactSession.get(
          "username"
        )}`,
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
              if (result[0].orderitemids.length) {
                setActualData(result[0].orderitemids);
              } else {
                setActualData([1]);
              }
            } else {
              setActualData([1]);
            }
          },
          (error) => {}
        );
    }
  }, []);

  if (ReactSession.get("username") === "") {
    window.location = "/login";
  }

  function feebackChange(event) {
    const { name, value } = event.target;
    setFeedback((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function onFeedbackSubmit() {
    fetch(`http://localhost:5000/skcart_post_feedback?_id=${id}`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feedback: feedback,
      }),
    }).then((res) => {
      alert("Thanks for submitting feedback....");
    });
  }

  return actualData.length !== 0 ? (
    actualData[0] === 1 ? (
      <NoItemFound />
    ) : (
      <div className="main-div status-main-div">
        {actualData[index][1].itemid._id === id && (
          <div className="item-details">
            <div className="item-content">
              <h3>{actualData[index][1].itemid.name}</h3>
              <small>Shopifcart</small>
              <h3>{actualData[index][1].itemid.Price}</h3>
            </div>
            <div className="item-img">
              <img src={actualData[index][1].itemid.main_img} alt="Product" />
            </div>
          </div>
        )}

        <div className="status-details">
          <div className="status-light">
            <span
              style={{
                backgroundColor:
                  actualData[index][1].orderdate !== "" ? "green" : "#f4f4f6",
              }}
            ></span>
            <hr />
            <span
              style={{
                backgroundColor:
                  actualData[index][1].shippeddate !== "" ? "green" : "#f4f4f6",
              }}
            ></span>
            <hr />
            <span
              style={{
                backgroundColor:
                  actualData[index][1].outfordeliverydate !== ""
                    ? "green"
                    : "#f4f4f6",
              }}
            ></span>
            <hr />
            <span
              style={{
                backgroundColor:
                  actualData[index][1].deliverydate !== ""
                    ? "green"
                    : "#f4f4f6",
              }}
            ></span>
          </div>
          <div className="status-content">
            <div className="individual-status">
              <h4>
                Order ConfirmedWed,{" "}
                {actualData[index][1].orderdate &&
                  actualData[index][1].orderdate}
              </h4>
              <small>
                Your Order has been placed.
                {actualData[index][1].orderdate &&
                  actualData[index][1].orderdate}
              </small>
            </div>
            <div className="individual-status">
              <h4>
                Shipped Wed,{" "}
                {actualData[index][1].shippeddate &&
                  actualData[index][1].shippeddate}
              </h4>
              <small>Your item has been shipped.</small>
              <small>
                {actualData[index][1].shippeddate &&
                  actualData[index][1].shippeddate}
              </small>
              <small>
                Your item has been received in the hub nearest to you
              </small>
            </div>
            <div className="individual-status">
              <h4>
                Out For Delivery Thu,{" "}
                {actualData[index][1].outfordeliverydate &&
                  actualData[index][1].outfordeliverydate}
              </h4>
              <small>Your item is out for delivery</small>
              <small>
                {actualData[index][1].outfordeliverydate &&
                  actualData[index][1].outfordeliverydate}
              </small>
            </div>
            <div className="individual-status">
              <h4>
                Delivered{" "}
                {actualData[index][1].deliverydate &&
                  actualData[index][1].deliverydate}
              </h4>
              <small>Your item has been delivered</small>
              <small>
                {actualData[index][1].deliverydate &&
                  actualData[index][1].deliverydate}
              </small>
            </div>
          </div>
        </div>

        <form
          className="feedback"
          style={{
            display:
              actualData[index][1].orderdate &&
              actualData[index][1].shippeddate &&
              actualData[index][1].outfordeliverydate &&
              actualData[index][1].deliverydate
                ? "flex"
                : "none",
          }}
        >
          <input
            type="number"
            max={5}
            min={1}
            name="rating"
            onChange={feebackChange}
            value={feedback.rating}
          />
          <textarea
            name="review"
            placeholder="Give us feedback..."
            onChange={feebackChange}
            value={feedback.review}
          ></textarea>
          <button type="button" onClick={onFeedbackSubmit}>
            Feedback
          </button>
        </form>
      </div>
    )
  ) : (
    <Loader />
  );
}
export default OrderStatus;
