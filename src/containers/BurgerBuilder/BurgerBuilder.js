import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import {
  addIngredient, 
  removeIngredient,
  initIngredients,
  purchaseInit,
} from '../../store/actions/index';

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
  }

  componentDidMount() {
    this.props.onIngredientsInit();
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredient = {...this.props.ings};
  //   updatedIngredient[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({
  //     ingredients: updatedIngredient,
  //     totalPrice: newPrice,
  //   });
  //   this.updatePurchaseState(updatedIngredient);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //   if (oldCount <=0 ) {
  //     return;
  //   }
  //     const updatedCount = oldCount - 1;
  //     const updatedIngredient = {...this.props.ings};
  //     updatedIngredient[type] = updatedCount;
  //     const priceDeduction = INGREDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice - priceDeduction;
  //     this.setState({
  //       ingredients: updatedIngredient,
  //       totalPrice: newPrice,
  //     });
  //     this.updatePurchaseState(updatedIngredient);
  // }

  purchaseHandler = () => {
    if(this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.history.push('./auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = async () => {
  // const queryParams = [];
  // for (let i in this.props.ings) {
  //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
  // }
  // queryParams.push('price=' + this.state.totalPrice);
  // const queryString = queryParams.join('&');
  // this.props.history.push({
  //   pathname: '/checkout',
  //   search: '?' + queryString,
  // });
  this.props.onInitPurchase();
  this.props.history.push('/checkout');
  }

  render () {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>ingredients can't be loaded</p> : <Spinner />
    if (this.props.ings) {
      orderSummary = <OrderSummary 
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      price={this.props.price}
      ingredients={this.props.ings}/>

      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
            <BuildControls 
              disabled={disabledInfo}
              currentPrice={this.props.price}
              purchasable={this.updatePurchaseState(this.props.ings)}
              ordered={this.purchaseHandler}
              ingredientRemoved={this.props.onIngredientRemoved}
              isAuth={this.props.isAuthenticated}
              ingredientAdded={this.props.onIngredientAdded}/>
        </Aux>
        );
      }
    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(removeIngredient(ingredientName)),
    onIngredientsInit: () => dispatch(initIngredients()),
    onInitPurchase: () => dispatch(purchaseInit()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
