import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbartop from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    geolocation: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        location: credentials.geolocation,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid information ");
    }
    navigate("/login");
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Navbartop />
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="geolocation"
              value={credentials.geolocation}
              aria-describedby="locationhelp"
              onChange={onChange}
            />
            <div id="locationhelp" className="form-text">
              We'll never share your location with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-success">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
