import "./App.css";
import logo from "./logo.png";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./frontend/pages/home";
import Appp from "./frontend/pages/product";
import Cart from "./frontend/pages/cart";
import Signin from "./frontend/pages/signin";
import Signup from "./frontend/pages/signup";
import { ProductProvider } from "./frontend/context/productListing-context";
import Mockman from "mockman-js";
import Signout from "./frontend/pages/signout";
import { Wishlist } from "./frontend/pages/wishlist";
import {Ordersummary} from "./frontend/pages/ordersummary"
import { ToastWrapper } from "./frontend/components/toastWrap";
function App() {
  return (
    <div className="App">
      <ToastWrapper/>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Appp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mock" element={<Mockman />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/summary" element={<Ordersummary />} />
        </Routes>
      </ProductProvider>
    </div>
  );
}

export default App;
