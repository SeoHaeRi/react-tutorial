import React, { useState } from "react";
import "./App.css";

const initialState = {
  products: [
    {
      name: "마우스",
      price: 30000,
    },
    {
      name: "모니터",
      price: 40000,
    },
    {
      name: "USB",
      price: 15000,
    },
    {
      name: "이어폰",
      price: 90000,
    },
    {
      name: "키보드",
      price: 35000,
    },
  ],
};

function Product({ print }) {
  return (
    <ul>
      <li>
        {print.name} {print.price}원
      </li>
    </ul>
  );
}

function App() {
  const [products, setProducts] = useState([
    {
      name: "마우스",
      price: 30000,
    },
    {
      name: "모니터",
      price: 40000,
    },
    {
      name: "USB",
      price: 15000,
    },
    {
      name: "이어폰",
      price: 90000,
    },
    {
      name: "키보드",
      price: 35000,
    },
  ]);

  return (
    <div className="textArea">
      안녕
      <Product print={products[0]}> </Product>
    </div>
  );
}

export default App;
