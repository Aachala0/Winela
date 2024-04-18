import React from "react";

const Home = () => {
  return (
    <>
      <h3 className="text-left ml-16 font-semibold text-xl mt-4">Featured</h3>
      <div className="mx-auto grid w-full max-w-6xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-md border">
            <img
              src="src/assets/img/wines_4.jpg"
              alt="Laptop"
              className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
              style={{ objectFit: "contain" }}
            />
            <div className="p-4">
              <h1 className="inline-flex items-center text-lg font-semibold">
                New Rosse Saphire Wine
              </h1>
              <p className="mt-3 text-sm text-gray-600">
                Brandy ~ Drink ~ Italy
              </p>
              <div className="mt-4">
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                  #Pinot
                </span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"></span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"></span>
              </div>
              <div className="mt-5 flex items-center space-x-2">
                <span className="block text-sm font-semibold">
                  Price :
                  <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                    $65
                  </span>
                </span>
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-sm bg-red-800 px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-900/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-left ml-16 font-semibold text-xl mt-4">Special</h3>
      <div className="mx-auto grid w-full max-w-6xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-md border">
            <img
              src="src/assets/img/wines_4.jpg"
              alt="Laptop"
              className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
              style={{ objectFit: "contain" }}
            />
            <div className="p-4">
              <h1 className="inline-flex items-center text-lg font-semibold">
                New Rosse Saphire Wine
              </h1>
              <p className="mt-3 text-sm text-gray-600">
                Brandy ~ Drink ~ Italy
              </p>
              <div className="mt-4">
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                  #Pinot
                </span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"></span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"></span>
              </div>
              <div className="mt-5 flex items-center space-x-2">
                <span className="block text-sm font-semibold">
                  Price :
                  <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                    $65
                  </span>
                </span>
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-sm bg-red-800 px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-900/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
