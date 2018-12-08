import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") price = +param[1];
      else ingredients[param[0]] = +param[1]; // + operator casts the value to a number
    }
    this.setState({
      ingredients,
      price
    });
  }

  checkoucCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCancelled={this.checkoucCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              {...props}
              price={this.state.price}
              ingredients={this.state.ingredients}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
