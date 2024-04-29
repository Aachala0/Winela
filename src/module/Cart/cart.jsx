import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { base_url } from "../../constants";
import Product from "./components/cartProduct";
import { AuthContext } from "../../Context/auth/AuthContext";

const Home = () => {
  const [product, setProducts] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      getAllProducts();
    }
  }, [isAuthenticated]);
  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    axios
      .get(`${base_url}/api/user/user-cart`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h3 className="text-left ml-16 font-semibold text-xl mt-4">
        Shopping Cart
      </h3>
      <div className="mx-auto grid w-full max-w-6xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {product.map((product, i) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
