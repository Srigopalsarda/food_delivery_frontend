import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavLink from "react-bootstrap/esm/NavLink";
import { Badge } from "react-bootstrap";
import { useState } from "react";
import Modal from "../../src/Modal";
import Cart from "../screens/Cart";
import { useCart } from "./contextReducer";

function Navbartop() {
  const [cartView, setCartView] = useState(false);
  let data = useCart();

  return (
    <>
      <Navbar className="bg-success" bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className="fs-4 font-weight-bold font-italic " href="/">
            GoFood
          </Navbar.Brand>
          <div className="d-flex justify-start me-auto ">
            <Nav.Link className="text-white font-weight-bold" href="/">
              Home
            </Nav.Link>
            {localStorage.getItem("authToken") !== null ? (
              <Nav.Link className="text-white font-weight-bold" href="/myorder">
                My Orders
              </Nav.Link>
            ) : (
              ""
            )}
          </div>
          {localStorage.getItem("authToken") !== null ? (
            <div className="d-flex">
              <Nav.Link
                className="bg-white text-success rounded mr-2 font-weight-bold"
                onClick={() => setCartView(true)}
                // href="/cart"
              >
                <i
                  class="fa fa-shopping-cart"
                  style={{ color: "black", fontSize: "36px" }}
                ></i>{" "}
                <Badge
                  pill
                  className="bg-danger text-white rounded p-1 "
                  style={{ position: "relative", top: "-20px", left: "-10px" }}
                >
                  {data.length}
                </Badge>
              </Nav.Link>
              {cartView ? (
                <Modal
                  onClose={() => {
                    console.log(cartView);
                    setCartView(false);
                  }}
                >
                  <Cart />
                </Modal>
              ) : (
                ""
              )}
              <Nav.Link
                className="bg-white text-danger rounded mr-2 font-weight-bold"
                href="/login"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  // localStorage.removeItem("user");
                }}
              >
                Logout
              </Nav.Link>
            </div>
          ) : (
            <Nav className="">
              <div className="d-flex">
                <Nav.Link
                  className="bg-white text-success rounded mr-2 font-weight-bold"
                  href="/login"
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  className="bg-white text-success rounded font-weight-bold"
                  href="/createuser"
                >
                  Signup
                </Nav.Link>
              </div>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Navbartop;
