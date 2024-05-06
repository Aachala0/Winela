import React from "react";
import { X } from "lucide-react";
import { products } from "./cart";

export function Checkout() {
  return (
    <div className="mx-auto my-4 max-w-4xl md:my-6">
      <div className="overflow-hidden  rounded-xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product List */}
          <div className="bg-gray-100 px-5 py-6 md:px-8">
            <div className="flow-root">
              <ul className="-my-7 divide-y divide-gray-200">
                {products &&
                  products.map((product) => (
                    <li
                      key={product.product.id}
                      className="flex items-stretch justify-between space-x-5 py-7"
                    >
                      <div className="flex flex-1 items-stretch">
                        <div className="flex-shrink-0">
                          <img
                            className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                            src={product.product.imageSrc}
                            alt={product.product.imageSrc}
                          />
                        </div>
                        <div className="ml-5 flex flex-col justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-bold">
                              {product.product.title}
                            </p>
                            <p className="mt-1.5 text-sm font-medium text-gray-500">
                              {product.product.color}
                            </p>
                          </div>
                          <p className="mt-4 text-xs font-medium ">x 1</p>
                        </div>
                      </div>
                      <div className="ml-auto flex flex-col items-end justify-between">
                        <button
                          type="button"
                          className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                          <span className="sr-only">Remove</span>
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <hr className="mt-6 border-gray-200" />
          </div>

          {/* Contact Info */}
          <div className="px-5 py-6 text-gray-900 md:px-8">
            <div className="flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="py-6">
                  <h2 className="text-base  font-bold">Contact Information</h2>

                  <form action="#" className="mt-6">
                    <div className="space-y-5">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="name"
                        >
                          Shipping Address
                        </label>
                        <input
                          className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          id="address"
                          placeholder="Address"
                        />
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="name"
                        >
                          Full Name
                        </label>
                        <input
                          className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          id="name"
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="email"
                          id="email"
                          placeholder="Email"
                        />
                      </div>
                      <div>
                        <a href="/">
                          <button
                            type="button"
                            className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                          >
                            Confirm Order
                          </button>
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
