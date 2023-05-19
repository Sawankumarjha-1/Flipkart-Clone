import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";
import Man from "../../assets/man.png";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BsCartPlus, BsFillCartCheckFill } from "react-icons/bs";
import { ReactSession } from "react-client-session";
import Loader from "./Loader";
const NavigationBar = () => {
  ReactSession.setStoreType("localStorage");
  const [searchItem, setSearchItem] = useState("");
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    //Fethcing all individual product name
    fetch(`http://localhost:5000/skcart_products/allproducts?sub_name`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);
          setSearchData(result);
        },

        (error) => {}
      );
  }, []);

  function onSearchChange(e) {
    setSearchItem(e.target.value);
    //Fethcing all individual product name
    fetch(
      `http://localhost:5000/skcart_products/allproducts?sub_name=${searchItem}`,
      {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setSearchData(result);
        },

        (error) => {}
      );
  }
  function logout() {
    ReactSession.set("username", "");
    ReactSession.set("name", "");
    window.location = "/";
  }

  return searchData ? (
    <nav className="navigation-bar">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <div className="nav-search">
        <input
          className="search-input"
          type="text"
          name="search"
          value={searchItem}
          placeholder="search for product name..."
          autoComplete="off"
          onChange={onSearchChange}
        />
        <Link
          id="searchBtn"
          to={"/searchitem?name=" + searchItem}
          target="_blank"
        >
          <motion.button
            whileHover={{
              scale: 0.8,
              color: "#f2f7a1",
              backgroundColor: "#453c67",
            }}
          >
            <BsSearch className="btn" size={20} />
          </motion.button>
        </Link>
        <div className="search-suggestion">
          {searchData.map((element, index) => {
            return (
              <Link
                key={"searchdata" + index}
                to={"/individualsearchitem?_id=" + element._id}
                target="_blank"
                id="suggestionLink"
              >
                <div>
                  <img src={element.main_img} alt="not found" />
                </div>
                {element.sub_name}
              </Link>
            );
          })}
        </div>
      </div>
      <div
        className="nav-btn"
        style={{
          display:
            ReactSession.get("username") !== "" ? "none" : "inline-block",
        }}
      >
        <Link to="/login" className="btn-one">
          <motion.button
            whileHover={{
              scale: 0.9,
            }}
            onHoverStart={(e) => {}}
            onHoverEnd={(e) => {}}
          >
            Login
          </motion.button>
        </Link>
        <Link to="/signup" className="btn-two">
          <motion.button
            whileHover={{
              scale: 0.9,
            }}
            onHoverStart={(e) => {}}
            onHoverEnd={(e) => {}}
          >
            Signup
          </motion.button>
        </Link>
      </div>
      <div
        className="login-avatar"
        style={{
          display:
            ReactSession.get("username") === "" ? "none" : "inline-block",
        }}
      >
        <img src={Man} alt="Not Found" />
        <div className="avatar-list">
          <b>Hi , {ReactSession.get("name")}</b>
          <p>
            <Link to="/cart">
              <BsCartPlus className="avatar-list-icons" size={30} />
              Wishlist
            </Link>
          </p>
          <p>
            <Link to="/orders">
              <BsFillCartCheckFill className="avatar-list-icons" size={30} />
              Orders
            </Link>
          </p>
          <p onClick={logout}>
            <Link>
              <RiLogoutCircleRLine className="avatar-list-icons" size={30} />
              Logout
            </Link>
          </p>
        </div>
      </div>
    </nav>
  ) : (
    <Loader />
  );
};

export default NavigationBar;
