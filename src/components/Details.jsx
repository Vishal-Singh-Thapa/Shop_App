import axios from "../utils/Axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";

const Details = () => {
  // Konsi id ka product click kia tha wo URL s pta chl jayega
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Single product ka data jiski id "id" k barabar hogi uska data "product" m aa jayega.
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      // console.log(data);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return product ? (
    <div className="w-[70%] flex h-full justify-between items-center m-auto p-[10%]">
      <img
        src={`${product.image}`}
        alt=""
        className="transition-transform transform hover:scale-110 duration-300 ease-in-out object-contain h-[80%] w-[40%]"
      />
      <div className="content w-[50%]">
        <h1 className="text-4xl">{product.title}</h1>
        <h3 className="text-zinc-400 my-5">{product.category}</h3>
        <h2 className="text-red-300 mb-3">$ {product.price}</h2>
        <p className="mb-6">{product.description}</p>
        <Link className="py-2 mr-3 px-5 border border-red-200 text-red-300">
          Edit
        </Link>
        <Link className="py-2 px-5 border border-green-200 text-green-300">
          Delete
        </Link>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
