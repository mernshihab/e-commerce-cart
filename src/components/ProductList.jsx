import React, { useEffect, useState } from "react";
import Helper from "../utility/Helper.js";
import axios from "axios";
import FullScreenLoader from "./FullScreenLoader";
import toast from "react-hot-toast";

const ProductList = () => {
  let [data, setData] = useState(null);
  let [loader, setLoader]= useState(false)

  useEffect(() => {
    (async () => {
      await CallProductList();
    })();
  }, []);

  const CallProductList = async () => {
    let res = await axios.get(`${Helper.API_BASE}/product-list`);
    let productList = res.data["data"];
    setData(productList);
  };

  const AddToCart = async (id) => {
    try {
      setLoader(true)
      let res = await axios.get(`${Helper.API_BASE}/create-cart/${id}`,Helper.tokenHeader())
      setLoader(false)
      if (res.data["msg"] === "success") {
        toast.success("Cart Added")
      } else {
        toast.error("Error")
        
      }
    } catch (e) {
      Helper.Unauthorized(e.response.status)
    }
  }

  return (
    <div>
      {data === null || loader ? (
        <FullScreenLoader />
      ) : (
        <div className="container mt-3 ">
          <div className="row">
            {data.map((item) => {
              return (
                <div className="col-md-3 p-2">
                  <div className="card p-3">
                    <img className="w-100" src={item["image"]} alt="Image" />
                    <h5>
                      Price: $
                      {item["discount"] === 0 ? (
                        <span>{item["price"]}</span>
                      ) : (
                        <span>
                          <strike>{item["price"]} </strike>
                          {item["discount_price"]}
                        </span>
                      )}
                    </h5>
                    <h6>{item["title"]}</h6>
                    <button onClick={ async()=>{ await AddToCart(item["id"])}} className="btn btn-outline-danger">Add to cart</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
