import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./module/Home/index.jsx";
import Signup from "./module/auth/Signup/signup.jsx";
import Login from "./module/auth/Login/login.jsx";
import Contact from "./module/Contact/contact.jsx";
import Cart from "./module/Cart/cart.jsx";
import ProductOne from "./module/Home/productDetail.jsx";
import { Checkout } from "./module/Cart/checkout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "productDetail",
        element: <ProductOne />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
