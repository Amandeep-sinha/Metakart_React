import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App"
import Appp from "./frontend/pages/product";
import Home from "./frontend/pages/home";
import Cart from "./frontend/pages/cart";
import Signup from "./frontend/pages/signup"
import Signin from "./frontend/pages/signin"
import { makeServer } from "./server";
import {BrowserRouter} from "react-router-dom";
import { ProductProvider } from "./frontend/context/productListing-context";

// Call make Server
makeServer();

ReactDOM.render(
<BrowserRouter>
  <ProductProvider>
   <App/>
   </ProductProvider>
</BrowserRouter>,
  document.getElementById("root")
);