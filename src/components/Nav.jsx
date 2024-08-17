import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../utils/Context";

const Nav = () => {
  const [products] = useContext(ProductContext);

  // To get the set of distinct categories from all the available products
  // "reduce" function will return the array of all the categories in products
  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);

  // Inserting the categories in set will give the array of distinct categories
  distinct_category = [...new Set(distinct_category)];
  // console.log(distinct_category);

  // This will generate random colors for categories section
  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()}, 
    ${(Math.random() * 255).toFixed()}, ${(
      Math.random() * 255
    ).toFixed()}, 0.4`;
  };

  return (
    //   Nav Links
    <nav className="w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5">
      <Link className="py-2 px-5 border border-blue-200 text-blue-300">
        Add New Product
      </Link>

      <hr className="my-3 w-[80%]" />

      <h1 className="text-2xl mb-3 w-[80%]">Category Filter</h1>
      <ul className="w-[80%]">
        {distinct_category.map((dc, i) => {
          return (
            <Link
              key={i}
              // "/?category=${dc}", question mark jab laga hota h to redirect nahi hota page, bs URL address m change aiga
              to={`/?category=${dc}`}
              className="flex hover:text-blue-400 gap-2 items-center mb-3"
            >
              <span
                style={{ backgroundColor: color() }}
                className="rounded-full w-[15px] h-[15px] bg-blue-100"
              ></span>{" "}
              {dc}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
