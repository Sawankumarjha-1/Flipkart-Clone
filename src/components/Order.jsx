import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { GrStatusGoodSmall } from "react-icons/gr";
import GettingAllCategory from "../components/GettingAllCategroy.jsx";
import { ReactSession } from "react-client-session";
import Loader from "./sub-components/Loader";
import { useSearchParams } from "react-router-dom";
import NoItemFound from "./sub-components/NoItemFound";

const Home = () => {
  const [actualData, setActualData] = useState([]);
  const [searchParams] = useSearchParams();
  let status_set = searchParams.get("status");

  if (status_set == null) {
    status_set = "Delivered";
  }

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
  return actualData.length !== 0 ? (
    actualData[0] === 1 ? (
      <NoItemFound />
    ) : (
      <div className="home-page main-div">
        <GettingAllCategory />

        <div className="smartphones ordered-items">
          <div className="filter-smartphones" id="order-filter">
            <form method="get">
              <ul>
                <p>
                  <b>Order Status : </b>
                </p>
                <li>
                  <input
                    type="radio"
                    value="Delivered"
                    name="status"
                    defaultChecked={status_set === "Delivered" ? true : false}
                  />
                  <small>Delivered</small>
                </li>
                <li>
                  <input
                    type="radio"
                    value="On The Way"
                    name="status"
                    defaultChecked={status_set === "On The Way" ? true : false}
                  />
                  <small>On The Way</small>
                </li>
                <li>
                  <input
                    type="radio"
                    value="Cancelled"
                    name="status"
                    defaultChecked={status_set === "Cancelled" ? true : false}
                  />
                  <small>Cancelled</small>
                </li>
                <li>
                  <input
                    type="radio"
                    value="Returned"
                    name="status"
                    defaultChecked={status_set === "Returned" ? true : false}
                  />
                  <small>Returned</small>
                </li>
              </ul>

              <button type="submit">Apply Filter</button>
            </form>
          </div>
          <div className="smartphones-result order-smartphones-result">
            {actualData.map((element, index) => {
              return element.map((e, i) => {
                return (
                  i !== 0 &&
                  e["status"] === status_set && (
                    <Link
                      to={
                        e["status"] !== "Cancelled" &&
                        e["status"] !== "Returned"
                          ? "/status?_id=" +
                            e["itemid"]._id +
                            "&&presentat=" +
                            index
                          : "/"
                      }
                      key={"orderitem" + index + i}
                    >
                      <div className="individual-smartphone-result">
                        <div className="individual-smartpohone-result-left orders-individual">
                          <div className="img">
                            <img src={e["itemid"].main_img} alt="" />
                          </div>
                          <div className="result-content">
                            <b>{e["itemid"].name}</b>
                            <span>
                              <b>{e["itemid"].Rating}🌟</b>
                            </span>
                          </div>
                        </div>
                        <div
                          className="individual-smartpohone-result-right"
                          style={{ marginLeft: "20px" }}
                        >
                          <h3
                            style={{
                              color:
                                e["status"] === "On The Way"
                                  ? "yellow"
                                  : e["status"] === "Delivered"
                                  ? "green"
                                  : e["status"] === "Cancelled"
                                  ? "red"
                                  : "black",
                            }}
                          >
                            <GrStatusGoodSmall
                              className="order-status"
                              style={{
                                color:
                                  e["status"] === "On The Way"
                                    ? "yellow"
                                    : e["status"] === "Delivered"
                                    ? "green"
                                    : e["status"] === "Cancelled"
                                    ? "red"
                                    : "black",
                              }}
                            />
                            {e.status}
                          </h3>
                          <h2>{e["itemid"].Price}</h2>
                          <span>
                            <small>{e["itemid"].cutprice}</small>{" "}
                            <b>
                              {e["itemid"].actualcutprice &&
                                e["itemid"].actualprice &&
                                100 -
                                  parseInt(
                                    (e["itemid"].actualprice * 100) /
                                      e["itemid"].actualcutprice
                                  )}
                              % off
                            </b>
                          </span>
                          <small className="free-delivery">Free Delivery</small>
                        </div>
                      </div>
                    </Link>
                  )
                );
              });
            })}
          </div>
        </div>
      </div>
    )
  ) : (
    <Loader />
  );
};

export default Home;
