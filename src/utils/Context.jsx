import axios from "./Axios";
import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

const Context = (props) => {
  const [products, setProducts] = useState(null);

  // It will get the data via axios from api "Base URL + /products"
  // async-await is used becz of API, taki data milne k baad hi setProducts m data daala jaye
  const getProducts = async () => {
    try {
      const { data } = await axios("/products");
      //   console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffect is used to call the getProducts function as soon as we enter the webpage
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {/* Now, props.children can access the "products" data */}
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
