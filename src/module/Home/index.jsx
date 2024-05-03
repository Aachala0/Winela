import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../constants";
import Product from "./components/Product";

const Home = () => {
  const [products, setProducts] = useState([]);

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

  const displayProductsByCategory = (category) => {
    return (
      <>
        <h3 className="text-left ml-16 font-semibold text-xl mt-4">
          {category}
        </h3>
        <div className="mx-auto grid w-full max-w-6xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
          {products
            .filter((product) => product.category === category)
            .map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
      </>
    );
  };

  return (
    <>
      {displayProductsByCategory("Red Wine")}
      {displayProductsByCategory("White Wine")}
    </>
  );
};

export default Home;
