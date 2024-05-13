import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Helper from "../utility/Helper";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

const AppNavbar = () => {

  const handleLogOut = () => {
    sessionStorage.clear()
    window.location.href="/login"
  }

  return (
    <Navbar expand="lg" className="bg-white shadow-sm">
      <Container fluid>
        <Navbar.Brand href="#">
          <img className="nav-logo" src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            {Helper.isLogin() && (
              <NavLink className="nav-link" to="/cart-list">
                Cart List
              </NavLink>
            )}
          </Nav>
          {Helper.isLogin() ? (
            <button onClick={handleLogOut} className="btn btn-danger">Logout</button>
          ) : (
            <Link to="/login" className="btn btn-danger">Login</Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
