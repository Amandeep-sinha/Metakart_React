import React from "react";
import "../pages/main.css";
import { addToCart } from "../services/adToCart";
import { useCart } from "../context/cart-context";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useWishlist } from "../context/wishlist-context";
import { addProductsToWishlist } from "../services/addProductsToWishlist";
import { removeProductsFromWishlist } from "../services/removeProductsToWishlist";

export default function ProductCard({ products }) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { cart, cartdispatch } = useCart();
  const [inCart, setInCart] = useState(false);
  const { wishlist, wishlistdispatch } = useWishlist();
  const [inwishlist, setInWishlist] = useState(false);

  useEffect(() => {
    cart.cartProducts.find((prod) => prod._id === products._id) &&
      setInCart(true);
  }, [cart.cartProducts]);
  useEffect(() => {
    wishlist.wishlistProducts.find((prod) => prod._id === products._id)
      ? setInWishlist(true)
      : setInWishlist(false);
  }, [wishlist.wishlistProducts]);

  const addtocart = async () => {
    if (auth.isAuth) {
      try {
        const res = await addToCart(products, auth.token);
        if (res.status === 201) {
          cartdispatch({
            type: "SET_CART",
            payload: res.data.cart,
          });
          toast.success(`${products.title} added to the cart`);
        }
      } catch (error) {
        console.log(error);
        toast.error(` Cannot add ${products.title}`);
      }
    }
  };

  const addToWishlist = async () => {
    if (auth.isAuth) {
      try {
        const res = await addProductsToWishlist(products, auth.token);
        if (res.status === 201) {
          wishlistdispatch({
            type: "SET_WISHLIST",
            payload: res.data.wishlist,
          });
          toast.success(`${products.title} added to the wishlist`);
        }
      } catch (error) {
        console.log(error);
        toast.error(` Cannot add ${products.title}`);
      }
    }
  };
  const removeFromWishlist = async () => {
    const res = await removeProductsFromWishlist(products._id, auth.token);
    if (res.status === 200) {
      wishlistdispatch({
        type: "SET_WISHLIST",
        payload: res.data.wishlist,
      });
      toast.success(`${products.title} removed from wishlist`);
    } else {
      console.log(error);
      toast.error(` Cannot delete ${products.title}`);
    }
  };

  return (
    <>
      <div className="simple-card a">
        <a href="">
          <img src={products.image} alt="image" />
        </a>
        <span className="rate-pro">
          {" "}
          {products.rating} &nbsp;<i className="fa fa-star fa-xs"></i>
        </span>
        <h4>{products.author}</h4>
        <p>{products.title}</p>
        <div className="inline">
          <h5>Rs. {products.offerprice}</h5>
          <strike>Rs. {products.price}</strike>
        </div>
        <button className = "btn" style={{opacity:"100",zIndex:"auto"}}
          onClick={
            auth.isAuth
              ? inCart
                ? () => navigate("/cart")
                : () => addtocart()
              : () => navigate("/signin")
          }
        >
          {inCart ? "View in Cart" : "Add to Cart"}
        </button>
        <button className = "btn" style={{opacity:"100",zIndex:"auto"}}
          onClick={
            auth.isAuth
              ? inwishlist
                ? () => removeFromWishlist()
                : () => addToWishlist()
              : () => navigate("/signin")
          }
        >
          {inwishlist ? "Remove From Wishlist" : "Add To WishList"}
        </button>
      </div>{" "}
    </>
  );
}
