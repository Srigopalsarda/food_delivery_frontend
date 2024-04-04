import React, { useState } from "react";
import { useCart, useDispatchCart } from "./contextReducer";

function Card(props) {
  let priceOptions = Object.keys(props.options);
  let options = props.options;
  let dispatch = useDispatchCart();
  let data = useCart();
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState(0);
  let finalPrice = parseInt(options[size]) * quantity;
  const handleAddToCart = async () => {
    let food = [];

    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
  
    if(food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          finalPrice: finalPrice,
          quantity: quantity,
        });
        return;
      } 
      else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          quantity: quantity,
          size: size,
        });
      }
    }  
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      quantity: quantity,
      size: size,
    });
    
    console.log(data);
  };

  return (
    <>
      <div>
        <div className="card " style={{ borderRadius: "5px", width: "18rem" }}>
          <img
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover" }}
            src={props.foodItem.img}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <p className="card-text">{props.foodItem.desctiption}</p>
            <select
              className="m-2 h-100 bg-success"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            >
              {Array.from(Array(10), (e, i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success"
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <span>₹ {finalPrice ? finalPrice : "0"} /-</span>
          </div>
          <hr />
          <div className="d-flex justify-content-around mb-3">
            <button className="btn btn-success" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
