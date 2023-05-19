import React from "react";

function Invoice(props) {
  let quantity = props.data.quantity.split(",");
  console.log(quantity);
  let total = 0;
  for (let i = 0; i < props.cartitems.length; i++) {
    console.log(props.cartitems[i].actualprice);
    total += quantity[i] * props.cartitems[i].actualprice + 69;
  }
  return (
    <div className="Invoice">
      <li>
        <b>Name :</b>
        <p>{props.data.name}</p>
      </li>
      <li>
        <b>Phone : </b>
        <p>1234567890</p>
      </li>
      <li>
        <b>Payment Mode : </b>
        <p>{props.data.paymentmode}</p>
      </li>
      <li>
        <b>Address : </b>
        <p>
          {props.data.flat +
            " " +
            props.data.apartment +
            "," +
            props.data.city +
            "( " +
            props.data.pincode +
            " )"}
          {props.data.sector && `, Sec - ${props.data.sector}`}
        </p>
      </li>
      <li>
        <b>Date :</b>
        <p>{new Date().toLocaleDateString()}</p>
      </li>
      <li>
        <b>Time : </b>
        <p>{new Date().toLocaleTimeString("en-US")}</p>
      </li>

      <table>
        <thead>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </thead>
        <tbody>
          {props.cartitems.map((element, index) => {
            return (
              <tr>
                <td>{element.name}</td>
                <td>{quantity[index]}</td>
                <td>{element.Price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <b className="note">
        Secured Packaging Fee 69 for each item so 69 x {props.cartitems.length}{" "}
        : <span>₹ {69 * props.cartitems.length}</span>
      </b>
      <h2>
        Total : <span> ₹ {total}</span>
      </h2>

      <div className="invoice_img">
        <img src="authorize.png" alt="not found" />
      </div>

      <div className="btnDiv">
        <button
          type="button"
          onClick={() => {
            props.call("₹ " + total);
          }}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
export default Invoice;
