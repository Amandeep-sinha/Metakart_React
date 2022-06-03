import Footer from "../components/footer";
import { useWishlist } from "../context/wishlist-context";
import Navbar from "../components/navbar";
import ProductCard from "../components/productCard";
const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <>
      <Navbar />
      {
        <div>
          <div className="card-div">
            {wishlist.wishlistProducts.length === 0 && (
              <h1>Oops.. Wishlist is Empty</h1>
            )}

            {wishlist.wishlistProducts.map((products) => (
              <ProductCard products={products} key={products._id} />
            ))}
          </div>
          <Footer />
        </div>
      }
    </>
  );
};
export { Wishlist };
