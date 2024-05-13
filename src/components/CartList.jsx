import React, { useEffect, useState } from "react";
import axios from "axios";
import Helper from "../utility/Helper.js";
import toast from "react-hot-toast";
import FullScreenLoader from "./FullScreenLoader.jsx";

const CartList = () => {
  let [data, SetData] = useState(null);
  let [loader, SetLoader] = useState(false);

  useEffect(() => {
    (async () => {
      await CallCartList();
    })();
  }, []);

  const CallCartList = async () => {
    try {
      let res = await axios.get(
        `${Helper.API_BASE}/cart-list`,
        Helper.tokenHeader()
      );
      let productList = res.data["data"];
      SetData(productList);
    } catch (e) {
      Helper.Unauthorized(e.response.status);
    }
  };

  const RemoveCart = async (id) => {
    try {
      SetLoader(true);
      let res = await axios.get(
        `${Helper.API_BASE}/remove-cart/${id}`,
        Helper.tokenHeader()
      );
      SetLoader(false);
      if (res.data["msg"] === "success") {
        toast.error("Removed");
        await CallCartList();
      } else {
        toast.error("Request Fail");
      }
    } catch (e) {
      Helper.Unauthorized(e.response.status);
    }
  };
  return (
    <div>
      {data == null || loader ? (
        <FullScreenLoader />
      ) : (
        <div className="container mt-3">
          <div className="row">
            {data.map((item, i) => {
              return (
                <div className="col-md-3 p-1">
                  <div className="card p-3">
                    <img
                      className="w-100"
                      alt=""
                      src={item["product"]["image"]}
                    />

                    <h5>
                      {" "}
                      PRICE: $
                      {item["product"]["discount"] === 0 ? (
                        <span>{item["product"]["price"]}</span>
                      ) : (
                        <span>
                          <strike>
                            {<span>{item["product"]["price"]}</span>}
                          </strike>{" "}
                          {<span>{item["product"]["discount_price"]}</span>}
                        </span>
                      )}
                    </h5>
                    <p>{item["product"]["title"]}</p>
                    <button
                      onClick={async () => {
                        await RemoveCart(item["product"]["id"]);
                      }}
                      className="btn btn-outline-danger"
                    >
                      Remove
                    </button>
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

export default CartList;