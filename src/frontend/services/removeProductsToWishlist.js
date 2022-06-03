import axios from "axios";

const removeProductsFromWishlist = async (productId, token) => {
  console.log("id", productId);
  return await axios.delete(`/api/user/wishlist/${productId}`, {
    headers: { authorization: token },
  });
};
export { removeProductsFromWishlist };
