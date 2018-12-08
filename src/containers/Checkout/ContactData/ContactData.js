import React, { Component } from "react";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalcode: ""
    }
  };
  render() {
    return (
      <div>
        <h4>Enter your contact data</h4>
        <form></form>
      </div>
    )
  }
}

export default ContactData;
