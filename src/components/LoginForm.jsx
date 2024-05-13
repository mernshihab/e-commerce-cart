import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Helper from "../utility/Helper";
import toast from "react-hot-toast";
import ButtonSpinner from "./ButtonSpinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  let [submit, setSubmit] = useState(false);
  let navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let email = formData.get("email");
    if (Helper.isEmpty(email)) {
      toast.error("Email is Required");
    } else {
      setSubmit(true);
      let res = await axios.post(`${Helper.API_BASE}/user-login`, {
        UserEmail: email,
      });
      if (res.data["msg"] === "success") {
        toast.success(res.data["data"]);
        sessionStorage.setItem("email", email);
        navigate("/verify");
      } else {
        toast.error("Login Fail");
      }
      // setSubmit(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h1 className="text-center header">Login your account</h1>
        <div className="col-md-4">
          <div className="card">
            <form onSubmit={onSubmit} className="p-4">
              <label className="form-label">Your Email Address</label>
              <input name="email" type="email" className="form-control mt-2" />
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

export default LoginForm;
