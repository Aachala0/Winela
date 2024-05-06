import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import { base_url } from "../../constants";
import { AuthContext } from "../../Context/auth/AuthContext";
import { CartContext } from "../../Context/cart/CartContext";
import CartSummary from "../Cart/components/cartSummary";
import CartProduct from "./components/cartProduct";

const products = [
  {
    product: {
      id: 1,
      title: "Big Master Special",
      href: "#",
      price: 800,
      discount: 50,
      color: "White Wine",
      imageSrc: "src/assets/img/wines_4.jpg",
    },
    quantity: 1,
  },
  {
    product: {
      id: 2,
      title: "Johnnie Walker Red Label",
      href: "#",
      price: 6000,
      discount: 150,
      color: "Red Wine",
      imageSrc: "src/assets/img/Red-label.png",
    },
    quantity: 1,
  },
];
export { products };

export default function Cart() {
  const { user } = useContext(AuthContext);
  const { getCarts, cart, saveCarts } = useContext(CartContext);

  useEffect(() => {
    if (user && user._id) {
      getCarts();
    }
  }, [user]);

  useEffect(() => {
    if (cart && cart.products) {
      setValues({
        ...values,
        products: cart.products,
      });
    }
  }, [cart]);

  const formik = useFormik({
    initialValues: {
      products: products,
    },
    onSubmit: (data) => {
      console.log(data);
      saveCarts(data);
    },
  });

  const { values, setValues } = formik;

  const changeQuantity = (value, index) => {
    values.products[index] = {
      ...values.products[index],
      quantity: value,
    };
    console.log(values);
    setValues({
      ...values,
    });
  };

  const createOrderApi = (payload) => {
    let token = localStorage.getItem("token");
    axios
      .post(
        `${base_url}/api/orders/create/${user._id}`,
        { products: payload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        esewaCall(res.data.order);
      })
      .catch((err) => console.log(err));
  };

  const esewaCall = (order) => {
    console.log(order);
    var path = "https://uat.esewa.com.np/epay/main";
    var params = {
      amt: order.amount,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: order.amount,
      pid: order._id,
      scd: "EPAYTEST",
      su: "http://localhost:5173/users/esewa_payment_success",
      fu: "http://localhost:5173/users/esewa_payment_failed",
    };

    console.log(params);

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="mx-auto max-w-6xl px-2 lg:px-0">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <FormikProvider value={formik}>
          <Form
            noValidate
            onSubmit={formik.handleSubmit}
            className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
          >
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-gray-200">
                <FieldArray
                  name="products"
                  render={(arrayHelper) => (
                    <>
                      {values.products.length > 0 ? (
                        values.products.map((product, index) => (
                          <CartProduct
                            product={product.product}
                            quantity={product.quantity}
                            changeQuantity={changeQuantity}
                            index={index}
                            removeItem={() => arrayHelper.remove(index)}
                          />
                        ))
                      ) : (
                        <div className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">
                          Add Product to Cart
                        </div>
                      )}
                    </>
                  )}
                />
              </ul>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              >
                Save Cart
              </button>
            </section>
            {/* Order summary */}
            <CartSummary
              products={values.products}
              onClickCheckout={() => createOrderApi(values.products)}
            />
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
}
