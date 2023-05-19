import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Category = (props) => {
  // console.log(props.sub_category.Sub_category);
  return (
    <div className="main-category">
      <motion.div
        className="image-div"
        title={props.title}
        whileHover={{ scale: 0.8, backgroundColor: "#453c67" }}
      >
        <img src={props.image} alt="category " />
      </motion.div>
      <p>{props.title}</p>
      <div className="pop-up">
        {props.sub_category.Sub_category.map((element, index) => {
          return (
            <Link
              to={"/categorysearchitem?Category=" + props.title}
              key={"skcart_sub_category" + index}
            >
              <li>{element.name}</li>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
