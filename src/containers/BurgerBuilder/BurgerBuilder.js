import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-orders";
const INGREDIENT_PRICES = {
  tomato: 0.5,
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 2.5,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };
  componentWillMount() {
    axios
      .get("/ingredients.json")
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }
  updatePurchaseState(ingredients) {
    const isPurchasable = Object.keys(ingredients).some(
      igKey => ingredients[igKey] > 0
    );
    this.setState({
      purchasable: isPurchasable
    });
  }
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount > 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

      this.setState({
        totalPrice: newPrice,
        ingredients: updatedIngredients
      });
      this.updatePurchaseState(updatedIngredients);
    }
  };
  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    let queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`);
    }
    queryParams.push("price=" + this.state.totalPrice);
    queryParams = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: queryParams
    });
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <>
          <Burger
            ingredients={this.state.ingredients ? this.state.ingredients : {}}
          />
          <BuildControls
            price={this.state.totalPrice}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            purchasable={this.state.purchasable}
            ingredientRemoved={this.removeIngredientHandler}
            ingredientAdded={this.addIngredientHandler}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice.toFixed(2)}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
        />
      );
    }
    if (this.state.loading) orderSummary = <Spinner />;

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
