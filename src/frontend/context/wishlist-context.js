import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getProductsFromWishlist } from "../services/getProductsFromWishlist";
import { useAuth } from "./auth-context";
const wishlistContext = createContext();
const useWishlist = () => useContext(wishlistContext);
const WishlistProvider = ({ children }) => {
  const wishlistReducer = (state, action) => {
    switch (action.type) {
      case "SET_WISHLIST":
        return { ...state, wishlistProducts: action.payload };
      default:
        return state;
    }
  };
  const [wishlist, wishlistdispatch] = useReducer(wishlistReducer, {
    wishlistProducts: [],
  });
  const { auth } = useAuth();

  useEffect(
    () =>
      (async () => {
        if (auth.isAuth) {
          try {
            const res = await getProductsFromWishlist(auth.token);

            if (res.status === 200) {
              wishlistdispatch({
                type: "SET_WISHLIST",
                payload: res.data.wishlist,
              });
            }
          } catch (err) {
            console.log(err);
          }
        }
      })(),
    [auth.isAuth]
  );
  return (
    <wishlistContext.Provider value={{ wishlist, wishlistdispatch }}>
      {children}
    </wishlistContext.Provider>
  );
};
export { useWishlist, WishlistProvider };
