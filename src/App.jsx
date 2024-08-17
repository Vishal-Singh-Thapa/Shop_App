import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";

const App = () => {
  // "search" and "pathname" should be written as it is, alag spelling likhi to kaam ni karega
  const { search, pathname } = useLocation();
  // console.log(search);
  // console.log(pathname);

  return (
    <div className="h-screen w-screen flex">
      {/* This link will redirect us to home */}
      {/* jab humara URL home("/") par na ho ya phir, search ki length > 0 tab home ka button dikhna chaiye*/}
      {(pathname != "/" || search.length > 0) && (
        <Link
          to="/"
          className="text-red-400 absolute left-[17.6%] top-[5%] border py-1 px-2 border-red-200 rounded"
        >
          HOME
        </Link>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
