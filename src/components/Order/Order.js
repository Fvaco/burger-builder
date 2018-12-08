import React from "react";
import classes from "./Order.css";
const Order = props => {
  let ingredients = [];
  for(let ingredientName  in props.ingredients){
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    })
  }
  ingredients = ingredients.map(ingredient => {
    return (<span style={{
      textTransform: "capitalize",
      display: "inline-block",
      margin: "0 8px",
      border: "1px solid darkgrey",
      borderRadius: "3px",
      padding: "3px 8px"
    }} key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>)
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
    </div>
  );
};

export default Order;
