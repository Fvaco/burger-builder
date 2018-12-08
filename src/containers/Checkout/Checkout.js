import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state={
    ingredients: {
      tomato: 1,
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  }

  componentDidMount(){
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for(let param of query.entries()){
      ingredients[param[0]] = +param[1] // + operator casts the value to a number
    }
    this.setState({
      ingredients
    });
  }

  checkoucCancelledHandler = () => {
    this.props.history.goBack();
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  }
  render() {
    return (
      <div>
        <CheckoutSummary 
        checkoutCancelled={this.checkoucCancelledHandler}
        checkoutContinued={this.checkoutContinuedHandler}
        ingredients={this.state.ingredients}/>
      </div>
    );
  }
}

export default Checkout;
