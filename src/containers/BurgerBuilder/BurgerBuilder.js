import { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
}
class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredient = {...this.state.ingredients};
    updatedIngredient[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      ingredients: updatedIngredient,
      totalPrice: newPrice,
    });
    this.updatePurchaseState(updatedIngredient);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <=0 ) {
      return;
    }
      const updatedCount = oldCount - 1;
      const updatedIngredient = {...this.state.ingredients};
      updatedIngredient[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({
        ingredients: updatedIngredient,
        totalPrice: newPrice,
      });
      this.updatePurchaseState(updatedIngredient);
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          disabled={disabledInfo}
          currentPrice={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ingredientRemoved={this.removeIngredientHandler}
          ingredientAdded={this.addIngredientHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;