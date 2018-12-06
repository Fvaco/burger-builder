import React, { Component } from "react";

import Button from "../../UI/Button/Button";

// This component could be a functional component, no need to be a class component.
class OrderSummary extends Component {
  
  /* componentWillUpdate(){
    console.log("[OrderSummary] Will update");
  } */
  
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total price: {this.props.price}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.purchaseCancelled} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.purchaseContinued} btnType="Success">
          CONTINUE
        </Button>
      </>
    );
  }
}

export default OrderSummary;
