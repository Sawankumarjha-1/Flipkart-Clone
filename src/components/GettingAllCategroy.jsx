import React, { useState, useEffect } from "react";
import Category from "./sub-components/Category";

const GetiingAllCategroy = () => {
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    // Fetching Category Data
    fetch(`http://localhost:5000/allcategory`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setCategoryData(result);
        },

        (error) => {}
      );
  }, []);
  return (
    <div className="category">
      {categoryData.map((element, index) => {
        return (
          <Category
            link="/"
            image={element.image}
            title={element.Category}
            sub_category={element}
            key={"all_category" + index}
          />
        );
      })}
    </div>
  );
};

export default GetiingAllCategroy;
