import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "../../constants";
import Product from "./components/Product";

const Home = () => {
  const [product, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    axios
      .get(`${base_url}/api/product`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h3 className="text-left ml-16 font-semibold text-xl mt-4">Featured</h3>
      <div className="mx-auto grid w-full max-w-6xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {product.map((product, i) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <h3 className="text-left ml-16 font-semibold text-xl mt-4">Special</h3>
      <div className="mx-auto grid w-full max-w-6xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {product.map((product, i) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
