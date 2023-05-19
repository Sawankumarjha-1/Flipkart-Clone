import React, { useState, useEffect } from "react";

import { ReactSession } from "react-client-session";
import Loader from "../components/sub-components/Loader.jsx";
import NoItemFound from "../components/sub-components/NoItemFound.jsx";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";
import Invoice from "./Invoice.jsx";

const AddToCart = () => {
  const [popup, setpopup] = useState(false);
  const [orderFormDisplay, setOrderFormDisplay] = useState(false);
  const [actualData, setActualData] = useState([]);
  const [productPrice, setProductPrice] = useState(0);
  const [itemid, setItemId] = useState([]);
  const [invoiceDisplay, setInvoiceDisplay] = useState(false);
  const [checkUserExist, setCheckUserExist] = useState(false);
  const [formFields, setFormFields] = useState({
    name: ReactSession.get("name"),
    email: ReactSession.get("username"),
    phone: ReactSession.get("phone"),
    city: "",
    pincode: "",
    sector: "",
    quantity: "",
    flat: "",
    apartment: "",
    nearest: "",
    paymentmode: "Cash on delivery",
    orderitemids: "",
  });

  useEffect(() => {
    if (ReactSession.get("username") !== "") {
      fetch(
        `http://localhost:5000/skcart_getcartitem?email=${ReactSession.get(
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
            setActualData(result);
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
                    setCheckUserExist(true);
                  }
                },
                (error) => {}
              );
          },
          (error) => {}
        );
    }
  }, []);

  function onOrderFormChange(event) {
    const { name, value } = event.target;
    setFormFields((prev) => {
      return { ...prev, [name]: value };
    });
  }

  const submitData = async (price) => {
    const addr =
      formFields.flat +
      " " +
      formFields.apartment +
      "," +
      formFields.city +
      "( " +
      formFields.pincode +
      " )";
    let dataArray = [
      {
        address: addr,
        totalPrice: price,
        quantity: formFields.quantity,
        paymentmode: formFields.paymentmode,
      },
    ];
    for (let i = 0; i < itemid.length; i++) {
      dataArray.push(itemid[i]);
    }

    console.log(dataArray);

    formFields.orderitemids = dataArray;

    if (
      formFields.city !== "" &&
      formFields.apartment !== "" &&
      formFields.flat !== "" &&
      formFields.nearest !== "" &&
      formFields.quantity.length == 2 * actualData.cartitems.length + -1
    ) {
      let link = "http://localhost:5000/skcart_post_orders";
      if (checkUserExist) {
        link = `http://localhost:5000/skcart_updateorderitem?email=${ReactSession.get(
          "username"
        )}`;
      }
      fetch(link, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formFields.name,
          email: formFields.email,
          phone: formFields.phone,
          city: formFields.city,
          pincode: formFields.pincode,
          sector: formFields.sector,
          quantity: formFields.quantity,
          flat: formFields.flat,
          apartment: formFields.apartment,
          nearest: formFields.nearest,
          paymentmode: formFields.paymentmode,
          orderitemids: checkUserExist
            ? formFields.orderitemids
            : [formFields.orderitemids],
        }),
      }).then((res) => {
        alert("Ordered Successfully...");

        removeAllCartItem();
      });
    } else {
      alert("Please all the fields...");
    }
  };

  function initializePrice() {
    let pricevalue = 0;

    for (let i = 0; i < actualData.cartitems.length; i++) {
      pricevalue += actualData.cartitems[i].actualprice;
      setItemId((prev) => {
        return [
          ...prev,
          {
            status: "On The Way",
            orderdate:
              new Date().toLocaleDateString() +
              "," +
              new Date().toLocaleTimeString("en-US"),
            shippeddate: "",
            outfordeliverydate: "",
            deliverydate: "",
            itemid: actualData.cartitems[i],
          },
        ];
      });
    }
    setProductPrice(pricevalue);
  }
  function removeItem(id) {
    const filterData = actualData.cartitems.filter((data, index) => {
      return id !== data._id;
    });

    fetch(
      `http://localhost:5000/skcart_post_replace_cartitem?email=${ReactSession.get(
        "username"
      )}`,
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartitems: filterData,
        }),
      }
    ).then((res) => {
      window.location.reload();
    });
  }
  function removeAllCartItem() {
    fetch(
      `http://localhost:5000/skcart_post_replace_cartitem?email=${ReactSession.get(
        "username"
      )}`,
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartitems: [],
        }),
      }
    ).then((res) => {
      window.location.href = "/";
    });
  }
  function removeSaveLaterItem(id) {
    const filterData2 = actualData.savelaters.filter((data, index) => {
      return id !== data._id;
    });

    fetch(
      `http://localhost:5000/skcart_post_replace_savelater?email=${ReactSession.get(
        "username"
      )}`,
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          savelaters: filterData2,
        }),
      }
    ).then((res) => {
      window.location.reload();
    });
  }

  function saveLater(index, id) {
    fetch(
      `http://localhost:5000/skcart_postsavelateritem?email=${ReactSession.get(
        "username"
      )}`,
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          savelaters: actualData.cartitems[index],
        }),
      }
    ).then((res) => {
      removeItem(id);
    });
  }
  function moveCart(index, id) {
    fetch(
      `http://localhost:5000/skcart_postcartitem?email=${ReactSession.get(
        "username"
      )}`,
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartitems: actualData.savelaters[index],
        }),
      }
    ).then((res) => {
      removeSaveLaterItem(id);
    });
  }
  actualData.length && initializePrice();

  if (ReactSession.get("username") === "") {
    window.location = "/login";
  }

  return actualData.length !== 0 ? (
    <div className="add-to-cart">
      {/*Cart and Save later items*/}
      <div className="add-to-cart-left">
        {/*Cart items*/}
        <div
          className="add-to-cart-items"
          style={{ display: orderFormDisplay === false ? "block" : "none" }}
        >
          <h2 style={{ padding: "20px" }}>Added Items</h2>
          {actualData.cartitems == 0 ? (
            <NoItemFound />
          ) : (
            actualData.cartitems.map((element, index) => {
              return (
                <div
                  className="individual-cart-item"
                  key={"individual-cart-item" + index}
                >
                  <div className="individual-cart-item-left">
                    <img src={element.main_img} alt="item" />
                  </div>
                  <div className="individual-cart-item-middle">
                    <h3>{element.name}</h3>
                    <h2>{element.Price}</h2>
                  </div>
                  <div className="individual-cart-item-right">
                    <small>Delivery after 2 days of order</small>
                  </div>

                  <div className="save-later">
                    <button
                      onClick={() => {
                        saveLater(index, element._id);
                      }}
                    >
                      Save Later
                    </button>
                    <button
                      onClick={() => {
                        removeItem(element._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/*Place Orde Button*/}
        <div
          className="place-order"
          style={{
            display:
              orderFormDisplay === false
                ? actualData.cartitems.length !== 0
                  ? "flex"
                  : "none"
                : "none",
          }}
        >
          <button
            onClick={() => {
              initializePrice();
              setOrderFormDisplay(true);
            }}
          >
            PLACE ORDER
          </button>
        </div>
        {/*Form After Clicking on Place order*/}
        <div
          className="order-form-main-div"
          style={{ display: orderFormDisplay ? "flex" : "none" }}
        >
          <form className="order-form" method="post">
            <select>
              <option value="Cash on delivery" name="paymentmode">
                Cash on delivery
              </option>
            </select>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formFields.city}
              onChange={onOrderFormChange}
            />
            <input
              type="text"
              placeholder="Pincode"
              name="pincode"
              value={formFields.pincode}
              onChange={onOrderFormChange}
            />
            <input
              type="text"
              placeholder="Sector"
              name="sector"
              value={formFields.sector}
              onChange={onOrderFormChange}
            />
            <input
              type="text"
              placeholder="Flat no"
              name="flat"
              value={formFields.flat}
              onChange={onOrderFormChange}
            />
            <input
              type="text"
              placeholder="Apartment name"
              name="apartment"
              value={formFields.apartment}
              onChange={onOrderFormChange}
            />
            <textarea
              placeholder="Enter quantity of item separated by comma as the sequence of item.."
              name="quantity"
              value={formFields.quantity}
              onChange={onOrderFormChange}
              maxLength={
                actualData.cartitems.length + actualData.cartitems.length - 1
              }
            ></textarea>{" "}
            <textarea
              placeholder="Nearest Location.."
              name="nearest"
              value={formFields.nearest}
              onChange={onOrderFormChange}
            ></textarea>
            <div className="order-form-btn-div">
              <button
                type="button"
                onClick={() => {
                  if (
                    formFields.city !== "" &&
                    formFields.apartment !== "" &&
                    formFields.flat !== "" &&
                    formFields.nearest !== "" &&
                    formFields.quantity.length ==
                      2 * actualData.cartitems.length + -1
                  ) {
                    setInvoiceDisplay(true);
                  } else {
                    alert("fill all the details...");
                  }
                }}
              >
                <FaLocationArrow size={20} className="order-btn-icons" />
                PLACE ORDER
              </button>
            </div>
          </form>
        </div>
        {/*Save Later Item*/}
        <div className="add-to-cart-items">
          <h3 style={{ padding: "10px 20px" }}>Save For Later</h3>

          {actualData.savelaters.length == 0 ? (
            <NoItemFound />
          ) : (
            actualData.savelaters.map((element, index) => {
              return (
                <div className="individual-cart-item">
                  <div className="individual-cart-item-left">
                    <img src={element.main_img} alt="item" />
                  </div>
                  <div className="individual-cart-item-middle">
                    <h3>{element.name}</h3>
                    <h2>{element.Price}</h2>
                  </div>
                  <div className="save-later">
                    <button
                      onClick={() => {
                        moveCart(index, element._id);
                      }}
                    >
                      Move To Cart
                    </button>
                    <button
                      onClick={() => {
                        removeSaveLaterItem(element._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {/*Price*/}
      <div
        className="add-to-cart-right"
        // style={{ display: orderFormDisplay ? "flex" : "none" }}
      >
        <h3>
          <b>PRICE DETAILS</b>
        </h3>
        {actualData.cartitems.map((element, index) => {
          return (
            <p>
              Price for {element.sub_name} ( 1 Qty )<b>{element.Price}</b>
            </p>
          );
        })}

        <p>
          Delivery Charges <b>FREE</b>
        </p>
        <p>
          Secured Packaging Fee 69 x ({actualData.cartitems.length}){" "}
          <b>₹{69 * actualData.cartitems.length}</b>
        </p>

        {productPrice != 0 && (
          <h3 className="price">
            Total Amount(1 Qty. for each item){" "}
            <span>₹{productPrice + 69 * actualData.cartitems.length}</span>
          </h3>
        )}
      </div>
      {/*Invoice */}
      {invoiceDisplay && (
        <Invoice
          data={formFields}
          cartitems={actualData.cartitems}
          call={submitData}
        />
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default AddToCart;
