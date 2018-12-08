import React, { Component } from "react";

import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalcode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price, // this should be calculated on server side in a production setup,
      customer: {
        name: "Iván Hdez.",
        address: {
          street: "Testing, 1",
          zipCode: "46001",
          country: "ES"
        },
        email: "test@test.com",
        deilveryMethod: "fastest"
      }
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        // this.setState({
        //   loading: false
        //   // purchasing: false
        // });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({
          loading: false
        });
      });
  };
  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your mail" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="postal" placeholder="Postal code" />
        <Button clicked={this.orderHandler} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    if(this.state.loading) form = <Spinner/>
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
