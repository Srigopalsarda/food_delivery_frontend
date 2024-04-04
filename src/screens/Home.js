import React, { useState, useCallback, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import Button from "react-bootstrap/Button";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadFoodData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadFoodData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner">
            <div className="carousel-caption ">
              <div class="d-flex">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="carousel-item active mh-500 ">
                <img
                  src="https://source.unsplash.com/random/900%C3%97700/?food"
                  className="d-block w-100 opacity-50 contain"
                  alt="..."
                />
              </div>
              <div className="carousel-item mh-500">
                <img
                  src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="d-block w-100  opacity-50 contain"
                  alt="..."
                />
              </div>
              <div className="carousel-item mh-500">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="d-block w-100  opacity-50 contain"
                  alt="..."
                />
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container ">
        {foodCat.length !== 0
          ? foodCat.map((data) => {
              return (
                <div key={data._id} className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  <div className="row">
                    {foodItem.length !== 0
                      ? foodItem
                          .filter(
                            (item) =>
                              item.CategoryName === data.CategoryName &&
                              item.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                          )
                          .map((filterdItem) => {
                            return (
                              <div
                                key={filterdItem._id}
                                className="col-12 col-md-6 col-lg-4 mb-3"
                              >
                                <Card
                                  foodItem={filterdItem}
                                  options={filterdItem.options[0]}
                                />
                              </div>
                            );
                          })
                      : ""}
                  </div>
                </div>
              );
            })
          : "Loading..."}
      </div>
      <Footer />
    </div>
  );
}
