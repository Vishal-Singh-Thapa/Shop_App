import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/Axios";

const Home = () => {
  // Destructuring ProductContext we got from Context.jsx, to get Products data
  const [products] = useContext(ProductContext);
  // console.log(products);

  // "useLocation" is used to access and log the current pathname, search parameters, and state, which can then be used for various purposes within the component
  const { search } = useLocation();

  // ye search m aye hue URL ho ont the basis of "=" split kr dega and array m store kr dega
  let category_type = search.split("=");

  // ye decode kr dega category ko ("women%27s%20clothing" to "women's clothing")
  category_type = decodeURIComponent(category_type[1]);
  console.log(category_type);

  const [filteredProducts, setFilteredProducts] = useState(null);

  const getProductCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category_type}`);
      console.log(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // jab filteredProducts khali ho ya fir category_type ki value undefined ho i.e jab humne "HOME" pr click kia
    // tab saare products show hone chaiye becz HOME pr click krne pe URL "/" ho jata h, so "category_type" undefined ho jayega
    // becz "category_type" URL s milra h hume
    if (!filteredProducts || category_type == "undefined")
      setFilteredProducts(products);
    if (category_type != "undefined") getProductCategory();
  }, [category_type, products, filteredProducts]);

  return filteredProducts ? (
    <>
      <Nav />

      {/* Cards */}

      <div className="h-full w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filteredProducts &&
          filteredProducts.map((p, id) => {
            return (
              <Link
                key={id}
                to={`/details/${p.id}`}
                className="card mr-3 mb-3 p-3 border shadow rounded w-[18%] h-[40vh] flex flex-col justify-center items-center"
              >
                <div
                  className="transition-transform transform hover:scale-110 duration-300 ease-in-out mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
                  style={{
                    backgroundImage: `url(${p.image})`,
                  }}
                ></div>
                <h1 className="hover:text-blue-500">{p.title}</h1>
              </Link>
            );
          })}
      </div>
    </>
  ) : (
    //   Jab tk data API s "products" m nahi aiga tab tk ye "Loading..." text show hoga
    <Loading />
  );
};

export default Home;
