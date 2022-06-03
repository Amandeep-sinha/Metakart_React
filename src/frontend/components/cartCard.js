import { useAuth } from "../context/auth-context";
import { useCart } from "../context/cart-context";
import { removeFromCart } from "../services/removeFromCart";
import { updateQuantity } from "../services/updateQuantity";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProductsToWishlist } from "../services/addProductsToWishlist";
import { useWishlist } from "../context/wishlist-context";
import { toast } from "react-toastify";

export default function CartCard({ products }) {
  const { auth } = useAuth();
  const { cart, cartdispatch } = useCart();
  const { wishlist, wishlistdispatch } = useWishlist();
  const navigate = useNavigate();
  const remove = async () => {
    const res = await removeFromCart(products._id, auth.token);
    if (res.status === 200) {
      cartdispatch({
        type: "SET_CART",
        payload: res.data.cart,
      });
      toast.success(` ${products.title} removed from Cart`);
    } else {
      console.log(error);
      toast.error(`Cannot remove ${products.title}`);
    }
  };
  const update = async (type) => {
    let res = null;
    try {
      if (products.qty === 1 && type === "decrement") {
        res = await removeFromCart(products._id, auth.token);
        toast.success(` ${products.title} removed from Cart`);
      } else {
        res = await updateQuantity(products._id, auth.token, type);
        toast.info("Cart Updated Sucessfully");
      }

      if (res.status === 200) {
        cartdispatch({
          type: "SET_CART",
          payload: res.data.cart,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Cannot Updated Cart at the moment");
    }
  };

  const addToWishlist = async () => {
    if (auth.isAuth) {
      try {
        const res = await addProductsToWishlist(products, auth.token);
        if (res.status === 201) {
          const findProduct = wishlist.wishlistProducts.find(
            (item) => item._id === products._id
          );
          if (findProduct) {
            toast.error(`${products.title} already exist in the wishlist`);
          }
          if (!findProduct) {
            wishlistdispatch({
              type: "SET_WISHLIST",
              payload: res.data.wishlist,
            });
            console.log(res.data.wishlist);
            toast.success(`${products.title} added to the wishlist`);

            const cartItem = await removeFromCart(products._id, auth.token);
            if (cartItem.status === 200) {
              cartdispatch({
                type: "SET_CART",
                payload: cartItem.data.cart,
              });
            } else {
              console.log(error);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="horizontal-card" key={products._id}>
        <div>
          <img src={products.image} alt="image" />
        </div>
        <div className="card-content">
          <h2>{products.categoryName}</h2>
          <h4>
            By :- {products.author}{" "}
            <span className="rate">
              {" "}
              {products.rating} &nbsp;<i className="fa fa-star"></i>
            </span>
          </h4>
          <p>
            {products.title}
            <br />
            <br />
            <span className="price"> {products.offerprice}</span>{" "}
            <i>
              {" "}
              <strike>{products.price} </strike>18% off{" "}
            </i>
          </p>
          <div className="card-btn">
            <div>
              <button>
                <i
                  onClick={() => update("decrement")}
                  className="fa fa-minus"
                />
              </button>
              <button style={{ margin: "8px", padding: ".4rem 1rem" }}>
                {products.qty}
              </button>{" "}
              <button>
                <i onClick={() => update("increment")} className="fa fa-plus" />
              </button>
            </div>
            <button onClick={() => addToWishlist()}>Save For Later </button>
            <button onClick={() => remove()}>Remove</button>
          </div>
        </div>
      </div>

      <hr />
    </>
  );
}
