import React from "react";
import "./BirdItem.css";
import { BirdInterface } from "../../../../models/Bird";
export default function BirdItem({ birdName, price, image }: any) {
  return (
    <div className="bird__item">
      <div>
        <img src={image[0]} alt={birdName}></img>
      </div>
      <div>
        <a href="#">{birdName}</a>
        <p>{price} VNĐ</p>
      </div>
      <div id="add-to-cart">
        <span>
          <a href="">Add to cart</a>
        </span>
      </div>
    </div>
  );
}
