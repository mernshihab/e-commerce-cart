import React, { useState } from "react";
import Helper from "../utility/Helper";
import toast from "react-hot-toast";
import ButtonSpinner from "./ButtonSpinner";
import axios from "axios";

const VerifyForm = () => {
  let [submit, setSubmit] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let otp = formData.get("otp");
    if (Helper.isEmpty(otp)) {
      toast.error("Verification code required");
    } else {
      let email = sessionStorage.getItem("email");
      setSubmit(true);
      let res = await axios.post(`${Helper.API_BASE}/verify-login`, {
        UserEmail: email,
        OTP: otp,
      });
      if (res.data["msg"] === "success") {
        sessionStorage.removeItem("email");
        sessionStorage.setItem("token", res.data["data"]);
        window.location.href = "/";
      } else {
        toast.error("Invalid Code");
      }
      // setSubmit(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h1 className="text-center header">Verify your account</h1>
        <div className="col-md-4">
          <div className="card">
            <form onSubmit={onSubmit} className="p-4">
              <label className="form-label">Your Verification Code</label>
              <input name="otp" type="text" className="form-control mt-2" />
              <button
                disabled={submit}
                type="submit"
                className="btn btn-danger w-100 mt-3"
              >
                {submit ? <ButtonSpinner /> : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyForm;
