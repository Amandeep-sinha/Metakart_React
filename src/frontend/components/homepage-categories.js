import React from "react";
import "../pages/main.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductListing } from "../context/productListing-context";
import { useNavigate } from "react-router-dom";

export default function HomepageCategories() {
  const [data, setData] = useState([]);
  const { products, productdispatch } = useProductListing();
  const navigate = useNavigate();

  async function getCategories() {
    try {
      const response = await axios.get("/api/categories");
      const res = response.data.categories;
      setData(res);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => getCategories(), []);

  const categorySelector = (category) => {
    console.log(category);
    productdispatch({
      type: "CLEAR",
    });
    navigate("/products");
    productdispatch({
      type: `${category}`,
    });
  };

  return (
    <>
      <div className="hero-text">Trending Featured Sections</div>
      <div className="categories shadow-image">
        {data.map((item) => (
          <div
            onClick={() => categorySelector(item.categoryName)}
            className="shadow-image-hover"
          >
            <img src={item.image} alt="image" id="hover-img" />
          </div>
        ))}
      </div>{" "}
    </>
  );
}
