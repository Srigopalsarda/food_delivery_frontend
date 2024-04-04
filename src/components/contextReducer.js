import React, { createContext, useContext, useReducer } from "react";

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          quantity: action.quantity,
          size: action.size,
        },
      ];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    case "DROP":
      let empArray = [];
      return empArray;
    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === action.id) {
          arr[index] = {
            ...food,
            quantity: parseInt(action.quantity) + parseInt(food.quantity),
            price:
              (parseInt(action.quantity) + parseInt(food.quantity)) *
              (food.price / food.quantity),
          };
        }
        return arr;
      });
      return arr;

    default:
      return console.log("error in reducer");
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <cartDispatchContext.Provider value={dispatch}>
      <cartStateContext.Provider value={state}>
        {children}
      </cartStateContext.Provider>
    </cartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);
