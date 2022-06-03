import React from "react";
import { createContext, useContext, useEffect, useReducer } from "react";
import { getProductsFromCart } from "../services/getProductsFromCart";
import { useAuth } from "./auth-context";

const cartContext = createContext();
const useCart = () => useContext(cartContext);
const CartProvider = ({ children }) => {
  const cartReducer = (state, action) => {
    switch (action.type) {
      case "SET_CART":
        return { ...state, cartProducts: action.payload };
      default:
        return state;
    }
  };
  const [cart, cartdispatch] = useReducer(cartReducer, {
    cartProducts: [],
  });
  const { auth } = useAuth();
  useEffect(
    () =>
      (async () => {
        if (auth.isAuth) {
          try {
            const response = await getProductsFromCart(auth.token);

            if (response.status === 200) {
              cartdispatch({
                type: "SET_CART",
                payload: response.data.cart,
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      })(),
    [auth.isAuth]
  );
  return (
    <cartContext.Provider value={{ cart, cartdispatch }}>
      {children}
    </cartContext.Provider>
  );
};
export { useCart, CartProvider };
