import axios from "axios";
const getProductsFromWishlist = async (token) => {
  return await axios.get("/api/user/wishlist", {
    headers: { authorization: token },
  });
};

export { getProductsFromWishlist };
