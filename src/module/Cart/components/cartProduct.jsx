import React from "react";
import { Heart, Trash } from "lucide-react";
import { base_url } from "../../../constants";

export default function CartProduct({
  product,
  quantity,
  changeQuantity,
  index,
  removeItem,
}) {
  const add_sub_quantity = (newQuantity) => {
    if (newQuantity > 0) {
      changeQuantity(newQuantity, index);
    }
  };

  return (
    <div key={product.id} className="">
      <li className="flex py-6 sm:py-6 ">
        <div className="flex-shrink-0">
          <img
            src={product.imageSrc}
            // ? `${base_url}/api/product/${product.image}`
            // : "src/assets/img/wines_4.jpg"

            alt={product.name}
            className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
            <div>
              <div className="flex justify-between">
                <h3 className="text-sm">
                  <a href={product.href} className="font-semibold text-black">
                    {product.title}
                  </a>
                </h3>
              </div>
              <div className="mt-1 flex text-sm">
                <p className="text-sm text-gray-500">{product.color}</p>
                {product.size ? (
                  <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                    {product.size}
                  </p>
                ) : null}
              </div>
              <div className="mt-1 flex items-end">
                <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium line-through">
                  Rs. {product.price}
                </span>
                <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                  Rs. {product.price - product.discount}
                </span>
                &nbsp;&nbsp;
                <p className="text-sm font-medium text-green-500">
                  Rs. {product.discount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
      <div className="mb-2 flex">
        <div className="min-w-24 flex">
          <button
            type="button"
            className="h-7 w-7"
            onClick={() => add_sub_quantity(quantity - 1)}
          >
            -
          </button>
          <input
            type="text"
            className="mx-1 h-7 w-9 rounded-md border text-center"
            value={quantity}
          />
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center"
            onClick={() => add_sub_quantity(quantity + 1)}
          >
            +
          </button>
        </div>
        <div className="ml-6 flex text-sm">
          <button
            onClick={removeItem}
            type="button"
            className="flex items-center space-x-1 px-2 py-1 pl-0"
          >
            <Trash size={12} className="text-red-500" />
            <span className="text-xs font-medium text-red-500">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
